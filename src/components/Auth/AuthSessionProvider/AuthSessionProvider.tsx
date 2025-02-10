"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";

function Auth({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="spinner"
          style={{
            width: "50px",
            height: "50px",
            border: "2px solid rgba(0, 0, 0, 0.1)",
            borderTop: "5px solid #000",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
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
