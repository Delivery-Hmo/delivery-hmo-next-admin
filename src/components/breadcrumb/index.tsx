import { useMemo } from "react";
import { Breadcrumb as BreadcrumbAnt, Col, Row } from "antd";
import items from "../menu/items";
import { usePathname } from "next/navigation";
import { useAuth } from "@src/context/auth";
import { firstPage } from "@src/utils/constants";

const pathsWithQuery: readonly string[] = ["empresas"];

const Breadcrumb = () => {
  const { user } = useAuth();
  const pathname = usePathname();

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
    <Row gutter={10}>
      <Col style={{ paddingTop: 2 }}>
        {icon}
      </Col>
      <Col>
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
      </Col>
    </Row>
  );
};

export default Breadcrumb;