import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainfall",
  description: "A minimalist site browser and manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}