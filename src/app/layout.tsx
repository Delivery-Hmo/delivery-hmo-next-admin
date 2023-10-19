'use client';
import './globals.css';
import { ReactNode } from "react";
import { App, ConfigProvider, Layout } from "antd";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/errorBoundary";
import Sider from "@src/components/sider";

export default function RootLayout({
  children,
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
                <ErrorBoundary>
                  <Layout.Content style={{ margin: 20 }}>
                    {children}
                  </Layout.Content>
                </ErrorBoundary>
              </Layout>
            </AuthProvider>
          </App>
        </ConfigProvider >
      </body>
    </html>
  );
}
