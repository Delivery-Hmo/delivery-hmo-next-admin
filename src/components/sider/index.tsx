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
      <div style={{ textAlign: "center" }}>
        <br />
        <Avatar style={{ backgroundColor: "grey" }} size="large" icon={<UserOutlined />} />
        <h3 style={{ color: "white" }}>{user.email}</h3>
      </div>
      <Menu
        defaultSelectedKeys={["/" + pathname.split("/")[1]]}
        theme="dark"
        mode="inline"
        items={
          items.map((item) => {
            if (!item.url) return item;

            return {
              onClick: () => router.push(item.url.toString().toLocaleLowerCase()),
              ...item
            };
          })
        }
      />
    </Layout.Sider>
  );
};

export default Sider;