import { Col, Row } from 'antd';
import { usePathname, useRouter } from "next/navigation";
import CreateButton from '../registerButton';
import BackButton from '../backButton';
import { useMemo } from "react";
import { useAuth } from "@src/context/auth";

const textButtonsCreate: Record<string, string> = {
  "empresas": "empresa",
  "sucursales": "sucursal",
  "vendedores": "vendedor",
  "repartidores": "repartidor",
  "productos": "producto"
} as const;

const HeaderView = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const firstPath = useMemo<string>(() =>
    pathname?.split("/")[1] || "",
    [pathname]
  );

  const inPathWithTable = useMemo(() =>
    Object.keys(textButtonsCreate).some(k => k === firstPath),
    [firstPath]
  );

  const inPathRegister = useMemo(() =>
    inPathWithTable && pathname.split("/").length > 2,
    [inPathWithTable, pathname]
  );

  if (!user) return null;

  console.log(firstPath);

  return (
    <>
      <Row justify='space-between' align="middle">
        <Col>
          <h1>
            {
              inPathRegister
                ? "Registrar " + textButtonsCreate[firstPath]
                : firstPath.charAt(0).toUpperCase() + firstPath.slice(1)
            }
          </h1>
        </Col>
        {
          Object.keys(textButtonsCreate).some(k => k === firstPath) && <Col>
            {
              inPathRegister
                ? <BackButton onClick={() => router.push(`/${firstPath}`)} />
                : <CreateButton onClick={() => router.push(`/${firstPath}/registrar`)}>
                  {"Registrar " + textButtonsCreate[firstPath]}
                </CreateButton>
            }
          </Col>
        }
      </Row>
      <br />
    </>
  );
};

export default HeaderView;;