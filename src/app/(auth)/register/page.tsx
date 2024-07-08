import { type Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Registration",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function Register() {
  return <div>Register</div>;
}
