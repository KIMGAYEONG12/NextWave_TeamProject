import React from "react";

export default function Card({
  children,
  className = "",
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-ink-100 shadow-card ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
