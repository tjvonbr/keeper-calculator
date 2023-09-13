import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Keeper Calculator",
  description: "Calculate the value of your Sleeper keepers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-[#171717]" lang="en">
      <body>{children}</body>
      <Toaster position="bottom-right" />
    </html>
  );
}
