import { useState } from "react";
import { Layout } from "antd";
import { useAuth } from "@src/context/auth";
import HeaderMenu from './menuContainerItems/headerMenu';
import MenuContainerItems from "./menuContainerItems";

const Sider = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <HeaderMenu
        collapsed={collapsed}
      />
      <MenuContainerItems />
    </Layout.Sider>
  );
};

export default Sider;