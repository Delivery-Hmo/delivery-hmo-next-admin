"use client";

import { useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { FiltersProps } from "@src/interfaces/components/table";
import { SearchOutlined } from "@ant-design/icons";


const Filters = <T extends {} | undefined>({ items, onSearch }: FiltersProps<T>) => {

  return (
    <Card>
      <Form onFinish={onSearch} layout="vertical">
        <Row style={{ marginBottom: 10 }}
          justify="space-between"
          align="middle">
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

              return (
                <Col key={name as string} md={8}>
                  <Form.Item
                    name={name as string}
                    label={label}
                  >

                    <Input
                      placeholder={name as string}
                      {...item}
                      name={name as string}
                    />
                  </Form.Item>
                </Col>
              );
            })
          }

        </Row>
      </Form>
    </Card>
  );
};

export default Filters;