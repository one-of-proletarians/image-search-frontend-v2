"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { FC } from "react";

export const LogoutButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      {...props}
    >
      logout
    </Button>
  );
};
