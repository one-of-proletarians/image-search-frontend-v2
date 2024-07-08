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
