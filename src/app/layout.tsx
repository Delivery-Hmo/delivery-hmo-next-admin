"use client";

import "./globals.css";
import { ReactNode } from "react";
import { App, ConfigProvider, Layout, Row } from "antd";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/errorBoundary";
import Sider from "@src/components/sider";
import Breadcrumb from "@src/components/breadcrumb";
import Error from "@src/app/error";
import HeaderPage from "@src/components/headerPage";

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
              <Layout style={{ height: "100vh" }}>
                <Sider />
                <div style={{ display: "block", padding: 20, width: "100%" }}>
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
