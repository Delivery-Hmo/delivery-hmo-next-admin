import { MdBusiness } from "react-icons/md";
import { HomeOutlined, PoweroffOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";

const firstPage = "?page=1&limit=5";

const items = [
  {
    key: "/inicio",
    url: "/inicio",
    label: "Inicio",
    icon: <HomeOutlined />,
  },
  {
    key: "/empresas",
    url: `/empresas${firstPage}`,
    label: "Empresas",
    icon: <MdBusiness style={{ fontSize: 18 }} />,
  },
  {
    key: "/cerrar-sesión",
    label: "Cerrar sesión",
    icon: <PoweroffOutlined />,
    onClick: () => getAuth().signOut(),
  },
];

export default items;