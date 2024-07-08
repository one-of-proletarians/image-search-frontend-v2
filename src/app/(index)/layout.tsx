import { PropsWithChildren } from "react";
import { type Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </>
  );
}
