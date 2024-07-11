import { FC } from 'react';
import { Drawer as DrawerAnt, Menu, Card } from 'antd';
import RowHeader from './rowHeader';
import { usePathname, useRouter } from 'next/navigation';
import items from './items';
import { CloseOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<Props> = ({ open, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DrawerAnt
      styles={{
        header: { backgroundColor: '#001529', },
        body: { backgroundColor: '#C8C8C8', }
      }}
      width="80%"
      placement="right"
      onClose={onClose}
      open={open}
      closeIcon={<CloseOutlined
        style={{ color: "white" }} />}
    >
      <Card style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <RowHeader collapsed={false} />
        <Menu
          theme="light"
          style={{ borderRadius: "8px", marginTop: 10 }}
          selectedKeys={["/" + pathname.split("/")[1]]}
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
      </Card>
    </DrawerAnt>
  );
};

export default Drawer;