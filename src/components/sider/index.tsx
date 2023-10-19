import { useState } from 'react';
import { Layout, Menu } from "antd";
import { HomeOutlined, PoweroffOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import { MdBusiness } from "react-icons/md";
import { useAuth } from "@src/context/auth";
import { useRouter } from "next/navigation";

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
        items={[
          {
            key: 'Inicio',
            label: 'Inicio',
            icon: <HomeOutlined />,
            onClick: () => router.push('/inicio')
          },
          {
            key: 'Empresas',
            label: 'Empresas',
            icon: <MdBusiness />,
            onClick: () => router.push('/empresas')
          },
          {
            key: 'Cerrar sesión',
            label: 'Cerrar sesión',
            icon: <PoweroffOutlined />,
            onClick: () => getAuth().signOut()
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default Sider;