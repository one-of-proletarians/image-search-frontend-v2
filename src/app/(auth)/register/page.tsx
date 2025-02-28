"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type RegisterSchemaType, registerSchema } from "@/schemes/zod";
import { Link } from "@/components/Link";
import { PasswordInput } from "@/components/PasswordInput";

export default function Register() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async () => {
    setPending(true);
  });

  return (
    <div>
      <form noValidate onSubmit={onSubmit}>
        <div className="grid gap-2 w-80">
          <Input
            errorMessage={errors.username?.message}
            isDisabled={pending}
            isInvalid={!!errors.username}
            label="Имя"
            size="sm"
            {...register("username")}
          />

          <Input
            errorMessage={errors.email?.message}
            isDisabled={pending}
            isInvalid={!!errors.email}
            label="E-mail"
            size="sm"
            {...register("email")}
          />

          <PasswordInput
            errorMessage={errors.password?.message}
            isDisabled={pending}
            isInvalid={!!errors.password}
            label="Пароль"
            size="sm"
            {...register("password")}
          />

          <PasswordInput
            errorMessage={errors.confirmPassword?.message}
            isDisabled={pending}
            isInvalid={!!errors.confirmPassword}
            label="Повторите пароль"
            size="sm"
            {...register("confirmPassword")}
          />

          <Button
            className="mt-2"
            color="primary"
            isDisabled={pending}
            size="lg"
            type="submit"
          >
            Регистрация
          </Button>
        </div>
      </form>
      <p className="mt-6 text-center">
        <span className="mr-1">Уже есть аккаунт?</span>
        <Link disabled={pending} href="/login">
          Вход
        </Link>
      </p>
    </div>
  );
}
