import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary: "bg-ink-100 text-ink-700 hover:bg-ink-200",
  outline: "bg-white text-ink-700 border border-ink-200 hover:bg-ink-50",
  ghost: "bg-transparent text-ink-600 hover:bg-ink-100",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg gap-1",
  md: "text-sm px-4 py-2 rounded-lg gap-1.5",
  lg: "text-sm px-5 py-2.5 rounded-xl gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
