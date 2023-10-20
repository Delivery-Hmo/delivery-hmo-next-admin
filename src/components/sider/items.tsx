import { MdBusiness } from "react-icons/md";
import { HomeOutlined, PoweroffOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";

const items = [
  {
    key: 'Inicio',
    label: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    key: 'Empresas',
    label: 'Empresas',
    icon: <MdBusiness />,
  },
  {
    key: 'Cerrar sesión',
    label: 'Cerrar sesión',
    icon: <PoweroffOutlined />,
    onClick: () => getAuth().signOut()
  },
];

export default items;