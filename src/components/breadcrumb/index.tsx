import { useMemo } from 'react';
import { Breadcrumb as BreadcrumbAnt } from 'antd';
import items from "../sider/items";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@src/context/auth";

const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const { icon, paths } = useMemo(() => {
    const paths = pathname.split("/");
    const pathIcon = "/" + paths[1];
    const icon = items.find(mi => mi?.key === pathIcon)?.icon;
    paths.splice(0, 1);

    return {
      icon,
      paths
    };
  }, [pathname]);

  const toPath = (path: string) => {
    const paths = pathname.split("/");
    const indexPath = paths.indexOf(path.toLowerCase().replaceAll(" ", "-"));
    const toPaths = paths.slice(0, indexPath + 1);
    toPaths.splice(0, 1);

    let to = "";

    toPaths.forEach((path) => {
      to += ("/" + path);
    });

    if (to.includes("configuracion")) return;

    router.push(to);
  };

  if (!user) return null;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        {icon}
      </div>
      <BreadcrumbAnt
        items={
          paths.map(path => ({
            title: path.charAt(0).toUpperCase() + path.slice(1),
            href: "",
            onClick: () => toPath(path)
          }))
        }
      />
    </div>
  );
};

export default Breadcrumb;