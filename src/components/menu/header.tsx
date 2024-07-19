import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import Drawer from './drawer';

const { Header: HeaderAnt } = Layout;

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(!open);

  return (
    <>
      <HeaderAnt style={{ backgroundColor: '#304878' }}>
        <Button
          onClick={showDrawer}
          type="primary"
          style={{ top: "5px", right: "34px" }}
          icon={<BarsOutlined style={{ fontSize: "140%", marginTop: "8%" }} />}
          size="large"
        />
      </HeaderAnt>
      <Drawer open={open} onClose={showDrawer} />
    </>
  );
};

export default Header;
