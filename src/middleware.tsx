import { auth } from "@/auth"

export default auth((req) => {
    const { nextUrl, auth: session } = req
    const requestedPath = nextUrl.pathname

    if (!session && requestedPath !== "/login") {
        return Response.redirect(new URL("/login", nextUrl.origin))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}