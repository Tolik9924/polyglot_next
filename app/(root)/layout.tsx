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
      "name": "Lessons"
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
    <html lang="en">
      <body>
        <Navbar list={navbar} isSticky />
        {children}
      </body>
    </html>
  );
}