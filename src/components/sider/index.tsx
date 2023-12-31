import { useState } from 'react';
import { Layout, Menu } from "antd";
import { useAuth } from "@src/context/auth";
import { useRouter } from "next/navigation";
import items from "./items";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

const Sider = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  if (!user) return null;

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        items={items.map((item) => ({ onClick: () => router.push(item?.key?.toString().toLocaleLowerCase() as string), ...item }))}
      />
    </Layout.Sider>
  );
};

export default Sider;