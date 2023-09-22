import { ReactNode } from 'react'
import { Layout as LayoutAnt } from "antd"
import Sider from "../sider"
import { useAuth } from "@src/app/context/auth"

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <LayoutAnt style={{ height: "100vh" }}>
      {user && <Sider />}
      <LayoutAnt.Content style={{ margin: 20 }}>
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  )
}

export default Layout