import { useState } from 'react'
import { Layout, Menu } from "antd"
import { auth } from "@src/app/firebase";

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: '1',
            label: 'nav 1',
          },
          {
            key: '2',
            label: 'nav 2',
          },
          {
            key: '3',
            label: 'Cerrar sesión',
            onClick: () => auth.signOut()
          },
        ]}
      />
    </Layout.Sider>
  )
}

export default Sider