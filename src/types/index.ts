import { ButtonProps } from "@nextui-org/button";
import { OAuthProviderType } from "next-auth/providers";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Primitive = string | number | boolean;

type ItemData = {
  images: Array<File>;
  [key: string]: Primitive | Array<File>;
};

export type UploadData = Record<string, ItemData>;

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthButtonProps extends ButtonProps {
  callbackUrl?: string;
  redirect?: boolean;
  provider: OAuthProviderType;
}
