import { FC } from 'react';
import { Col, Row } from 'antd';
import CreateButton from '../registerButton';
import BackButton from '../backButton';
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  path?: string;
  goBack?: boolean;
}

const textButtonsCreate: Record<string, string> = {
  "Sucursales": "sucursal",
  "Vendedores": "vendedor",
  "Repartidores": "repartidores",
  "Productos": "productos"
} as const;

const HeaderView: FC<Props> = ({ title, path, goBack }) => {
  const router = useRouter();

  return (
    <>
      <Row justify='space-between' align="middle">
        <Col>
          <h1>
            {title}
          </h1>
        </Col>
        {
          path && <Col>
            {
              goBack
                ? <BackButton onClick={() => router.push(path)} />
                : <CreateButton onClick={() => router.push(path)}>
                  {"Registar " + textButtonsCreate[title]}
                </CreateButton>
            }
          </Col>
        }
      </Row>
      <br />
    </>
  );
};

export default HeaderView;