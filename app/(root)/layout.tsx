'use client';

import { Navbar } from "core_ui_design_system";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navbar = [
    {
      "id": "1",
      "name": "lessons"
    },
    {
      "id": "2",
      "name": "Sign In"
    },
    {
      "id": "3",
      "name": "Login"
    },
  ];

  return (
    <main>
      <Navbar list={navbar} isSticky />
      {children}
    </main>
  );
}