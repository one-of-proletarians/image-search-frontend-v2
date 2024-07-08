import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow h-full flex items-center justify-center">
      {children}
    </main>
  );
}
