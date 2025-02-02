import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
export const metadata: Metadata = {
  title: "LexiLearn",
};

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <>{children}</>
      </body>
    </html>
  );
}
