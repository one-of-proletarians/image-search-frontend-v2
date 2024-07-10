"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthButton } from "@/components/FacebookButton";
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import { loginSchema, type LoginSchemaType } from "@/schemes/zod";
import { Link } from "@/components/Link";
import { PasswordInput } from "@/components/PasswordInput";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const [pending, setPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (user) => {
    try {
      setPending(true);
      setIsError(false);

      const response = await signIn("credentials", {
        ...user,
        callbackUrl: "/",
        redirect: false,
      });

      if (response?.error) {
        setIsError(true);
      } else {
        router.push("/");
      }

      setPending(false);
    } catch (e) {}
  });

  return (
    <form onSubmit={onSubmit}>
      {isError && (
        <div className="flex rounded-medium bg-danger-200 mb-2 p-2 items-center justify-center">
          E-mail или пароль введены неверно
        </div>
      )}

      <div className="grid gap-2 w-80">
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

        <Button color="primary" isDisabled={pending} size="lg" type="submit">
          Войти
        </Button>
        <div className="flex items-center pt-4 justify-center">
          <span>Нет аккаунта?</span>
          <Link className="text-blue-700 hover:underline ml-2" href="/register">
            Зарегистрироваться
          </Link>
        </div>

        <div className="flex items-center py-4">
          <Divider className="flex-1" />
          <p className="mx-2">или</p>
          <Divider className="flex-1" />
        </div>

        <div className="flex justify-center gap-2">
          <AuthButton
            className="flex-1"
            isDisabled={pending}
            provider="google"
            startContent={<GoogleIcon className="w-5 h-5" />}
            onClick={() => setPending(true)}
          >
            Google
          </AuthButton>
          <AuthButton
            className="flex-1"
            isDisabled={pending}
            provider="facebook"
            startContent={<FacebookIcon className="w-5 h-5" />}
            onClick={() => setPending(true)}
          >
            Facebook
          </AuthButton>
        </div>

        <Link
          className="text-center text-blue-700 hover:underline mt-10"
          href=""
        >
          Забыли пароль?
        </Link>
      </div>
    </form>
  );
}
