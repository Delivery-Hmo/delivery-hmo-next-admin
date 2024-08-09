import { MdBusiness } from "react-icons/md";
import { HomeOutlined, PoweroffOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { firstPage } from "@src/utils/constants";


const items = [
  {
    key: "/inicio",
    path: "/inicio",
    label: "Inicio",
    icon: <HomeOutlined />,
  },
  {
    key: "/empresas",
    path: `/empresas${firstPage}`,
    label: "Empresas",
    icon: <MdBusiness style={{ fontSize: 18 }} />,
  },
  {
    key: "/sucursales",
    path: `/sucursales${firstPage}`,
    label: "Sucursales",
    icon: <ShopOutlined style={{ fontSize: 18 }} />,
  },
  {
    key: "/vendedores",
    path: `/vendedores${firstPage}`,
    label: "Vendedores",
    icon: <AiOutlineUserAdd style={{ fontSize: 18 }} />,
  },
  {
    key: "/repartidores",
    path: `/repartidores${firstPage}`,
    label: "Repartidores",
    icon: <TeamOutlined style={{ fontSize: 18 }} />,
  },
  {
    key: "/cerrar-sesión",
    label: "Cerrar sesión",
    icon: <PoweroffOutlined />,
    onClick: () => getAuth().signOut(),
  },
];

export default items;