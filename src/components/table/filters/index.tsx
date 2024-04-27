"use client";

import { useState } from "react";
import { Col, Form, Input, Row } from "antd";
import { FiltersProps } from "@src/interfaces/components/table";

const Filters = <T extends undefined>({ items, onSearch }: FiltersProps<T>) => {
  const [filter, setFilter] = useState<{ [key: string]: string; }>({});

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
      </Row>
    </Form>
  );
};

export default Filters;