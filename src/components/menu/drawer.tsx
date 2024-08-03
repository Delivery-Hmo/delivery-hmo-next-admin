import { FC } from 'react';
import { Drawer as DrawerAnt, Card } from 'antd';
import HeaderMenu from './menuContainerItems/headerMenu';
import { CloseOutlined } from "@ant-design/icons";
import MenuContainerItems from './menuContainerItems';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<Props> = ({ open, onClose }) => {
  return (
    <DrawerAnt
      styles={{
        header: { backgroundColor: '#304878', },
        body: { backgroundColor: '#C8C8C8', }
      }}
      width="80%"
      placement="right"
      onClose={onClose}
      open={open}
      closeIcon={<CloseOutlined
        style={{ color: "white" }}
      />}
    >
      <Card style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <HeaderMenu collapsed={false} />
        <MenuContainerItems />
      </Card>
    </DrawerAnt>
  );
};

export default Drawer;