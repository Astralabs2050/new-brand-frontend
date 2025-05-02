import type { Metadata } from "next";

import "./globals.css";
import "./font.css"
import Notification from "./components/notification";


export const metadata: Metadata = {
  title: "Astra Brand",
  description: "Astra Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      style={{
        fontFamily:"ClashGrotesk-Regular"
      }}
        className={` antialiased`}
      >
        {children}
        <Notification.ToastContainer />
      </body>
    </html>
  );
}
