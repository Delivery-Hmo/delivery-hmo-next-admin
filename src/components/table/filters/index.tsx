"use client";

import { Button, Card, Col, Input, Row } from "antd";
import { FiltersProps } from "@src/interfaces/components/table";
import { SearchOutlined } from "@ant-design/icons";
import { onSearch } from "./actions";

const Filters = <T extends {}>({ items }: FiltersProps<T>) => {
  return (
    <Card
      styles={{
        body: {
          marginBottom: 20
        }
      }}
    >
      <form action={onSearch}>
        <Row
          justify="space-between"
          align="middle"
        >
          <Col>
            <h3>Filtros</h3>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              shape="round"
              style={{ width: '100%' }}
              icon={<SearchOutlined />}
            >
              Buscar
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: -20 }} gutter={[10, 20]}>
          {
            items.map((item) => {
              const { name, typeInput } = item;
              const nameString = name as string;

              return (
                <Col key={nameString} xs={24} md={8}>
                  {
                    (!typeInput || typeInput === "input") && <Input
                      {...item}
                      name={nameString}
                    />
                  }
                  {
                    typeInput === "select" && <select
                      {...item}
                      name={nameString}
                    />
                  }
                </Col>
              );
            })
          }
        </Row>
      </form >
    </Card>
  );
};

export default Filters;;;