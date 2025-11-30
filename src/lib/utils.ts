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

export function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);

  const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`; // Less than 1 minute
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`; // Less than 1 hour
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour ago`; // Less than 1 day
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day ago`; // Less than 30 days
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month ago`; // Less than 12 months
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year ago`; // More than 1 year
}
