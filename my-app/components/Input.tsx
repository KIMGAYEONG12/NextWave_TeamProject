import React from "react";
import Icon, { IconName } from "./icons";

export default function Input({
  icon,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: IconName }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
          <Icon name={icon} className="w-4 h-4" />
        </span>
      )}
      <input
        className={`w-full rounded-lg border border-ink-200 bg-white text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 py-2 ${
          icon ? "pl-9 pr-3" : "px-3"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
