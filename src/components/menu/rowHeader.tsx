import { FC } from 'react';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { Grid } from 'antd';
import { useAuth } from '@src/context/auth';

interface Props {
  collapsed?: boolean;
}

const { useBreakpoint } = Grid;

const RowHeader: FC<Props> = ({ collapsed }) => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  return (
    <Row
      justify="center"
      align="middle"
      gutter={10}
      style={
        screens.xs ?
          { textAlign: "center" } :
          { textAlign: "center", backgroundColor: "#fff", margin: 10, paddingTop: 20, paddingBottom: 20, borderRadius: "8px" }
      }
    >
      <Col>
        <Avatar style={{ backgroundColor: "#87D068" }} size={collapsed ? 48 : 64} icon={<UserOutlined />} />
      </Col>
      <Col>
        {
          !collapsed && <div style={screens.xs ? { color: "black" } : { color: "white" }}>
            <b>{user?.email}</b>
          </div>
        }
      </Col>
    </Row>
  )
}

export default RowHeader;
