"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // When loading, do nothing
    if (status === "loading") return;

    // If no session is found, redirect to sign in page
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  // Optionally, you can display a loader while checking session
  if (status === "loading" || !session) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
