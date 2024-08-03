"use client";

import { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { onSearch } from "./actions";
import FormControl from "../../formControl";
import { useFormControl } from "@src/context/formControl";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = <T extends {}>() => {
  const { items, onPopupScroll } = useFormControl<T>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    let defaultValues: T = {} as T;

    items.forEach(item => {
      const { name } = item;
      const nameString = name as string;

      let defaultValue: string | undefined = searchParams.get(nameString) || "";

      if (defaultValue && item.type === "select") {
        const options = item.options || [];

        defaultValue = options.find(option => option.value === defaultValue)?.value?.toString() || undefined;
      }

      defaultValues = {
        ...defaultValues,
        [nameString]: defaultValue
      };
    });

    form.setFieldsValue(defaultValues);
    form.submit();
  }, [form, items, searchParams]);

  return (
    <Card
      styles={{
        body: {
          marginBottom: 20
        }
      }}
    >
      <Form<T>
        onFinish={async (values) => {
          const url = await onSearch(values);

          router.push(url);
        }}
        form={form}
      >
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
              const { name } = item;
              const nameString = name as string;

              return (
                <Col key={nameString} xs={24} md={8}>
                  <FormControl
                    item={item}
                    onPopupScroll={onPopupScroll}
                  />
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