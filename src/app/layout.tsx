'use client';
import './globals.css';
import { useState, ReactNode, useRef } from "react";
import { App, ConfigProvider, Layout } from "antd";
import { User } from "firebase/auth";
import AuthProvider from "./context/auth";
import Sider from "./components/sider";
import ErrorBoundary from "./components/errorBoundary";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#206A5D"
            }
          }}
        >
          <App>
            <AuthProvider onLoadUser={setUser}>
              <Layout style={{ height: "100vh" }}>
                {user && <Sider />}
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
