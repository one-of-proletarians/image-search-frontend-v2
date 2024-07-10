"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { AuthButtonProps } from "@/types";

export const AuthButton: FC<AuthButtonProps> = ({
  callbackUrl: cbu = "/",
  redirect = true,
  provider,

  ...rest
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || cbu;
  const signInHandler = () =>
    signIn(provider, {
      callbackUrl,
      redirect,
    });

  return <Button onPress={signInHandler} {...rest} />;
};
