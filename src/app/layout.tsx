"use client";

import "./globals.css";
import { ReactNode } from "react";
import { App, ConfigProvider, Layout, Row } from "antd";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/errorBoundary";
import Sider from "@src/components/menu/sider";
import Breadcrumb from "@src/components/breadcrumb";
import Error from "@src/app/error";
import HeaderPage from "@src/components/headerPage";
import Menu from "@src/components/menu"

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#304878"
            }
          }}
        >
          <App>
            <AuthProvider>
              <Layout style={{ height: "100vh", backgroundColor: "grey" }}>
                <Menu />
                <div style={{ display: "block", padding: 20, width: "100%", overflowY: "auto" }}>
                  <Breadcrumb />
                  <HeaderPage />
                  <ErrorBoundary fallback={<Error />}>
                    <Layout.Content >
                      {children}
                    </Layout.Content>
                  </ErrorBoundary>
                </div>
              </Layout>
            </AuthProvider>
          </App>
        </ConfigProvider>
      </body>
    </html >
  );
}
