import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession, signOut } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAccessToken() {
  const session = await getSession();
  return session?.access_token;
}

export async function federatedLogout() {
  try {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.removeItem("batchSession");
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    const response = await fetch("/api/auth/federated-logout");
    const data = await response.json(); // Parse the JSON response

    if (response.ok) {
      await signOut({ redirectTo: "/login" });
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Logout error:", error);
    signOut({ redirectTo: "/login" }); // Redirect to login page on error
  }
}
