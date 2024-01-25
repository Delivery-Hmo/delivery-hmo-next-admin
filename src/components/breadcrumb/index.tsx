import { useMemo } from 'react';
import { Breadcrumb as BreadcrumbAnt } from 'antd';
import items, { firstPage } from "../sider/items";
import { usePathname } from "next/navigation";
import { useAuth } from "@src/context/auth";

const pathsWithQuery: readonly string[] = ["empresas"];

const Breadcrumb = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const { icon, paths } = useMemo(() => {
    const paths = pathname.split("/");
    const pathIcon = "/" + paths[1];
    const icon = items.find(mi => mi?.key === pathIcon)?.icon;

    return {
      icon,
      paths: paths.filter(p => p !== "").map(path => {
        const indexPath = paths.indexOf(path.toLowerCase().replaceAll(" ", "-"));
        const toPaths = paths.slice(0, indexPath + 1);
        toPaths.splice(0, 1);

        const pathsString = toPaths.join("/");

        if (pathsWithQuery.includes(path)) {
          return `${pathsString}${firstPage}`;
        }

        return `${pathsString}`;
      })
    };
  }, [pathname]);

  if (!user) return null;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        {icon}
      </div>
      <BreadcrumbAnt
        items={
          paths.map(path => {
            const paths = path.split("/");
            const lastPath = paths[paths.length - 1].split("?")[0];

            return {
              href: `/${path}`,
              title: lastPath.charAt(0).toUpperCase() + lastPath.slice(1),
            };
          })
        }
      />
    </div>
  );
};

export default Breadcrumb;