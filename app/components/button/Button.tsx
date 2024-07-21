import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={twMerge(
        "rounded-xl bg-accent-blue px-5 py-3 text-xl text-white hover:bg-[#45a8be]",
        className,
      )}
    >
      {children}
    </button>
  );
}
