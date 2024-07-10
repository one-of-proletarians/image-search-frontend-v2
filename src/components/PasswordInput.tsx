"use client";

import { Input, InputProps } from "@nextui-org/input";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      ref={ref}
      endContent={
        <button
          className={clsx("flex items-center justify-center h-full rounded", {
            "text-foreground-400": props.isDisabled,
          })}
          disabled={props.isDisabled}
          tabIndex={-1}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      }
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
