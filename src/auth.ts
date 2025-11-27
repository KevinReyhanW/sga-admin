import NextAuth, {User} from "next-auth"
import Keycloak from "@auth/core/providers/keycloak";
import Credentials from "@auth/core/providers/credentials";
import { JWT } from "next-auth/jwt"
import {jwtDecode} from "jwt-decode";
import {keycloakApi} from "@/app/services/apiClient";

declare module "next-auth" {
    interface Session {
        access_token?: string
        id_token?: string
        expired_at?: number
        error?: string
        roles: string[]
        organization_id: string
        organization_name: string
    }

    interface User {
        access_token?: string
        refresh_token?: string
        expires_at?: number
        id_token?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string
        refresh_token?: string
        expired_at?: number
        id_token?: string
        roles: string[]
        organization_id: string
        organization_name: string
        error?: string
    }
}

const refreshAccessToken = async (token: JWT) => {
    try {
        // Prepare data for the token refresh request
        const details = {
            client_id: process.env.AUTH_KEYCLOAK_ID,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token as string,
        }

        // Encode the details into URL form format
        const formBody: string[] = []
        Object.entries(details).forEach(([key, value]) => {
            const encodedKey = encodeURIComponent(key)
            const encodedValue = encodeURIComponent(value as string)
            formBody.push(encodedKey + "=" + encodedValue)
        })
        const formData = formBody.join("&")
        const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`

        // Make the HTTP request to refresh the token
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formData,
        })
        const refreshedTokens = await response.json()

        // Handle response and update token information
        if (!response.ok) throw refreshedTokens

        return {
            ...token,
            access_token: refreshedTokens.access_token,
            expired_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
            refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
        }
    } catch (error) {
        // Handle errors by returning the original token with an error field
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Keycloak({
            clientId: process.env.AUTH_KEYCLOAK_ID!,
            clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
            issuer: process.env.AUTH_KEYCLOAK_ISSUER,
        }),
        Credentials({
            id: "keycloak-credentials",
            name: "Keycloak Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    // Use your existing Keycloak API login
                    const formData = new URLSearchParams()
                    formData.append("client_id", process.env.AUTH_KEYCLOAK_ID!)
                    formData.append("client_secret", process.env.AUTH_KEYCLOAK_SECRET!)
                    formData.append("grant_type", "password")
                    formData.append("scope", "openid organization")
                    formData.append("username", credentials.email as string)
                    formData.append("password", credentials.password as string)

                    const response = await keycloakApi.post(`/protocol/openid-connect/token`, formData, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    })

                    if (response.data?.access_token) {
                        const decoded = jwtDecode(response.data.access_token) as any

                        const user: User = {
                            id: decoded.sub,
                            email: decoded.email,
                            name: decoded.name || decoded.preferred_username,
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token,
                            expires_at: Math.floor(Date.now() / 1000) + response.data.expires_in,
                        }

                        // console.log("Credentials auth successful:", user);
                        return user
                    }

                    return null
                } catch (error) {
                    console.error("Credentials auth failed:", error)
                    return null
                }
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, account, user }) {
            const todayTimeStamp = Math.floor(Date.now() / 1000)

            if (account) {
                // Handle credentials provider
                if (account.provider === "keycloak-credentials") {
                    // Only store essential user data in JWT to keep it small
                    token.sub = user.id
                    token.email = user.email
                    token.name = user.name
                    token.expired_at = user.expires_at
                    token.access_token = user.access_token

                    if (user.access_token) {
                        const decoded = jwtDecode(user.access_token!) as any
                        // Only store minimal role info
                        token.roles = decoded.realm_access?.roles
                        if (decoded.organization) {
                            token.organization_name = Object.keys(decoded.organization)[0]
                            token.organization_id = decoded.organization[token.organization_name as string]?.id
                        }
                    }
                } else {
                    // Handle OAuth provider (Keycloak) - also minimize data
                    token.sub = account.providerAccountId
                    token.expired_at = account.expires_at as number
                    if (account?.access_token) {
                        const decoded = jwtDecode(account.access_token as string) as any
                        token.email = decoded.email
                        token.name = decoded.name || decoded.preferred_username
                        token.access_token = decoded.access_token
                        token.roles = decoded.realm_access?.roles
                        if (decoded.organization) {
                            token.organization_name = Object.keys(decoded.organization)[0]
                            token.organization_id = decoded.organization[token.organization_name as string]?.id
                        }
                    }
                }

                return token
            }

            if (token.expired_at && todayTimeStamp < (token.expired_at as number) - 100) {
                return token
            }

            return refreshAccessToken(token)
        },

        async session({ session, token }) {
            // Only include essential data in session to keep cookie size down
            if (session.user) {
                session.user.id = token.sub as string
                session.user.email = token.email as string
                session.user.name = token.name as string
            }

            // Add custom fields (keep minimal)
            session.roles = token.roles
            session.organization_id = token.organization_id
            session.organization_name = token.organization_name
            session.expired_at = token.expired_at
            session.access_token = token.access_token

            return session
        },

        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
})