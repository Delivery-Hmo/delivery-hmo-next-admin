"use client";

import { useEffect, useState, UIEvent, useCallback } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { SearchOutlined } from "@ant-design/icons";
import { ItemInput, ItemSelect, SelectGet } from "@src/interfaces/components/table";
import { get } from "@src/services/http/client";
import useMessage from "@src/hooks/useMessage";
import { onSearch } from "./actions";

interface Props<T> {
  items: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
}

const Filters = <T extends {}>({ items: itemsProp }: Props<T>) => {
  const message = useMessage();
  const [items, setItems] = useState<(ItemInput<keyof T> | ItemSelect<keyof T>)[]>(itemsProp);
  const [notLoadMore, setNotLoadMore] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const newItems = await Promise.all(itemsProp.map(async item => {
          if (item.type !== "select" || !item.url || !item.baseUrl) return item;

          const response = await get<SelectGet>({ baseUrl: item.baseUrl, url: item.url });

          item.loading = false;
          item.page = 1;
          item.options = response.list.map((r) => ({ value: r.id, label: `${r.name || ""} ${r.email ? " - " + r.email : ""}` }));

          return item;
        }));

        setItems(newItems);
      } catch (error) {
        console.log(error);
        message.error("Error al obtener los filtros de listas.");
      }
    };

    init();
  }, [itemsProp]);

  const onPopupScroll = async (e: UIEvent<HTMLDivElement, globalThis.UIEvent>, item: ItemSelect<keyof T>) => {
    if (notLoadMore) return;

    const selectItems = items.filter(i => i.type === "select") as ItemSelect<keyof T>[];

    if (selectItems.some(i => i.loading)) return;

    const target = e.target as HTMLDivElement;
    const { baseUrl, url, page } = item;

    if (target.scrollTop + target.offsetHeight !== target.scrollHeight) return;

    setItems(prev => prev.map(i => {
      const parseItem = i as ItemSelect<keyof T>;

      if (parseItem.id !== item.id) return parseItem;

      parseItem.loading = true;

      return parseItem;
    }));

    try {
      const response = await get<SelectGet>({ baseUrl, url: `${url}?page=${page! + 1}` });

      if (response.list.length !== 10) {
        setNotLoadMore(true);
      }

      setItems(items.map(i => {
        const parseItem = i as ItemSelect<keyof T>;

        if (parseItem.id !== item.id) return parseItem;

        parseItem.options = [...parseItem.options || [], ...response.list.map((r) => ({ value: r.id, label: `${r.name || ""} ${r.email ? " - " + r.email : ""}` }))];
        parseItem.loading = false;
        parseItem.page = page! + 1;

        return parseItem;
      }));
    } catch (error) {
      console.log(error);
      message.error("Error al obtener más resultados.");
    } finally {
      setItems(prev => prev.map(i => {
        const parseItem = i as ItemSelect<keyof T>;

        if (parseItem.id !== item.id) return parseItem;

        parseItem.loading = false;

        return parseItem;
      }));
    }
  };

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
              const { name, type } = item;
              const nameString = name as string;

              return (
                <Col key={nameString} xs={24} md={8}>
                  {
                    (!type || type === "input") && <Input
                      name={nameString}
                    />
                  }
                  {
                    type === "select" && <FormItem name={nameString}>
                      <Select
                        options={item.options}
                        loading={item.loading}
                        onPopupScroll={e => onPopupScroll(e, item)}
                      />
                    </FormItem>
                  }
                </Col >
              );
            })
          }
        </Row >
      </form >
    </Card >
  );
};

export default Filters;