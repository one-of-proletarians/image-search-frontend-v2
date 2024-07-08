"use client";

import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import Link from "next/link";
import { Divider } from "@nextui-org/divider";

import { LoginForm } from "@/types";
import login from "@/server-actions/login";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [pending, setPending] = useState(false);

  const onSubmit = handleSubmit(async (_, e) => {
    try {
      setPending(true);
      const formData = new FormData(e!.target);

      await login(formData);

      setPending(false);
    } catch (e) {}
  });

  return (
    <form className="flex flex-col gap-0 min-w-56" onSubmit={onSubmit}>
      <Input
        errorMessage="Email is invalid"
        isDisabled={pending}
        isInvalid={!!errors.email}
        placeholder="E-mail"
        {...register("email", { required: true })}
      />

      <Input
        errorMessage="Password is invalid"
        isDisabled={pending}
        isInvalid={!!errors.password}
        placeholder="Пароль"
        type="password"
        {...register("password", { required: true })}
      />

      <Button color="primary" type="submit">
        Войти
      </Button>

      <Divider className="mb-3 mt-5" />

      <Link className="text-center text-blue-900 hover:underline" href="">
        Забыли пароль?
      </Link>
    </form>
  );
}
