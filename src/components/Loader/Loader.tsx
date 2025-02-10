import { cn } from "@/lib/utils";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center h-[100vh]", className)}
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
};

export default Loader;
