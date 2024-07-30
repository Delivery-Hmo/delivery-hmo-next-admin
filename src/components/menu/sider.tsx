import { useState } from "react";
import { Layout } from "antd";
import HeaderMenu from './menuContainerItems/headerMenu';
import MenuContainerItems from "./menuContainerItems";

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

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