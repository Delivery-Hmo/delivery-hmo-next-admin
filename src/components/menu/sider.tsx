import { Avatar, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "@src/context/auth";
import { useRouter, usePathname } from "next/navigation";
import items from "./items";

const Sider = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <Layout.Sider collapsible>
      <div style={{ textAlign: "center", wordWrap: "break-word", margin: 5 }}>
        <br />
        <Avatar style={{ backgroundColor: "grey" }} size="large" icon={<UserOutlined />} />
        <div style={{ color: "white" }}>{user.email}</div>
      </div>
      <Menu
        selectedKeys={["/" + pathname.split("/")[1]]}
        theme="dark"
        mode="inline"
        items={
          items.map((item) => {
            if (!item.path) return item;

            return {
              onClick: () => router.push(item.path),
              ...item
            };
          })
        }
      />
    </Layout.Sider>
  );
};

export default Sider;