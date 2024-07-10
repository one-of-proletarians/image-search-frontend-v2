import { FC, PropsWithChildren } from "react";
import NextLink, { type LinkProps } from "next/link";
import clsx from "clsx";

type Props = LinkProps &
  PropsWithChildren & {
    disabled?: boolean;
    className?: string;
  };

export const Link: FC<Props> = ({ disabled, className, ...rest }) => {
  return (
    <NextLink
      {...rest}
      className={clsx(
        "cursor-pointer text-blue-700 hover:underline",
        className,
        disabled && "cursor-not-allowed pointer-events-none text-blue-900"
      )}
    />
  );
};
