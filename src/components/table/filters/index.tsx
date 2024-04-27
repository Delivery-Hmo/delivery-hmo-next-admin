"use client";

import { useState } from "react";
import { Col, Form, FormProps, Input, Row } from "antd";
interface Filter {
  name: string;
  placeholder: string;
}

interface FiltersProps<T> {
  filters: T[];
}

const Filters = ({ filters }: FiltersProps) => {
  const [filter, setFilter] = useState<{ [key: string]: string; }>({});

  const onSearch: FormProps<FieldType>['onFinish'] = () => {
    console.log(filter);

  };

  return (
    <Form
      onFinish={onSearch}
    >
      <Row style={{ marginBottom: 20 }} gutter={10}>
        {filters.map((filterItem, index) => (
          <Col key={index} md={6} >
            <Input
              type="text"
              name={filterItem.name}
              placeholder={filterItem.placeholder}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default Filters;