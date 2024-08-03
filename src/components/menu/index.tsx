import { Grid } from 'antd';
import Sider from './sider';
import Header from './header';
import { usePathname } from "next/navigation";
import { useAuth } from "@src/context/auth";

const { useBreakpoint } = Grid;

const MenuComponent = () => {
  const screens = useBreakpoint();
  const pathname = usePathname();
  const { user } = useAuth();

  if (pathname === "/" || !user) return null;

  return (
    screens.xs ? <Header /> : <Sider />
  );
};

export default MenuComponent;
