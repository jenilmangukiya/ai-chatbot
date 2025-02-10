"use client";

import Loader from "@/components/Loader/Loader";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";

function Auth({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  return children;
}

const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Auth>{children}</Auth>
    </SessionProvider>
  );
};

export default AuthSessionProvider;
