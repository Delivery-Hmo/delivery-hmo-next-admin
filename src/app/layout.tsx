'use client'
import './globals.css'
import { ConfigProvider } from "antd"
import AuthProvider from "./context/auth"
import Layout from "./components/layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </ConfigProvider >
      </body>
    </html>
  )
}
