import type { Metadata } from "next";
import "@/styles/globals.css"
import AuthWrapper from "./auth_wrapper";
import React from "react";

export const metadata: Metadata = {
    title: {
		template: "%s - 세일즈어드민",
		default: "세일즈어드민"
	},
    description: "프로퍼티파트너스 - 세일즈어드민",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </body>
    </html>
  );
}
