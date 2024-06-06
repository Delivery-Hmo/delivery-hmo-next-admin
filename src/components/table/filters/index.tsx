"use client";

import { Button, Card, Col, Form, Input, Row } from "antd";
import { FiltersProps } from "@src/interfaces/components/table";
import { SearchOutlined } from "@ant-design/icons";
import { onSearch } from "./actions";

const Filters = <T extends {}>({ items }: FiltersProps<T>) => {
  return (
    <Card>
      <form action={onSearch}>

        <Row
          style={{ marginBottom: 10 }}
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
        <Row style={{ marginBottom: -20 }} gutter={[10, 0]}>
          {
            items.map((item) => {
              const { name, label } = item;
              const nameString = name as string;

              return (
                <Col key={nameString} md={8}>
                  <Form.Item
                    name={nameString}
                    label={label}
                  >
                    <Input
                      {...item}
                      placeholder={nameString}
                      name={nameString}
                    />
                  </Form.Item>
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