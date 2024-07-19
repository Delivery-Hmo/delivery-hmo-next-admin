import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import items from '../items';

const MenuContainerItems = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu
      theme="light"
      style={{ marginTop: 10 }}
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
  )
}

export default MenuContainerItems