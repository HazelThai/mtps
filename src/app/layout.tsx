"use client";

import { store } from "@/store";
import { ThemeProvider } from "@mui/material";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import AuthGuard from "./components/@shared/AuthGuard/AuthGuard";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const publicPath = ["login", "reset-password", "forgot-password"].includes(
    pathname.split("/")[1]
  );
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <AuthProvider>
          <Provider store={store}>
            <ThemeProvider theme={{}}>{children}</ThemeProvider>
          </Provider>
        </AuthProvider>
        {/* <Provider store={store}>
          <ThemeProvider theme={{}}>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </Provider> */}
      </body>
    </html>
  );
}
