'use client';
import './globals.css';
import { ReactNode, useEffect, useState } from "react";
import { App, ConfigProvider, Layout } from "antd";
import AuthProvider from "@src/context/auth";
import ErrorBoundary from "@src/components/errorBoundary";
import Sider from "@src/components/sider";
import Breadcrumb from "@src/components/breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import { User } from "firebase/auth";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (loading) return;

    if (user && pathname === "/") {
      router.push('/inicio');
    }

    if (!user) {
      router.push('/');
    }
  }, [pathname, user, loading]);

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
            <AuthProvider
              onLoadUser={_user => {
                setUser(_user);
                setLoading(false);
              }}
            >
              <Layout style={{ height: "100vh" }}>
                <Sider />
                <ErrorBoundary>
                  <Layout.Content style={{ margin: 20 }}>
                    <Breadcrumb />
                    {children}
                  </Layout.Content>
                </ErrorBoundary>
              </Layout>
            </AuthProvider>
          </App>
        </ConfigProvider >
      </body>
    </html >
  );
}
