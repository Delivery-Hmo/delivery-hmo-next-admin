"use client";

import { Button, Col, Form, Input, Row } from "antd";
import { FiltersProps } from "@src/interfaces/components/table";

const Filters = <T extends {}>({ items, onSearch }: FiltersProps<T>) => {

  return (
    <Form onFinish={onSearch}>
      <Row style={{ marginBottom: 20 }} gutter={10}>
        {
          items.map((item) => {
            const { name } = item;

            return (
              <Col key={name as string} md={6}>
                <Input
                  {...item}
                  name={name as string}
                />
              </Col>
            );
          })
        }
        <Col md={6}>
          <Button htmlType="submit">Buscar</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;