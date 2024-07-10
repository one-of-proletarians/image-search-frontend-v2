"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { GoogleIcon } from "./icons";

import { AuthButtonProps } from "@/types";

export const GoogleButton: FC<AuthButtonProps> = ({
  callbackUrl: cbu = "/",
  redirect = true,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || cbu;

  return (
    <Button
      isIconOnly
      onClick={() => signIn("google", { callbackUrl, redirect })}
      {...rest}
    >
      <GoogleIcon className="w-5 h-5" />
    </Button>
  );
};
