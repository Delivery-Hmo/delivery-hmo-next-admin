"use client";

import { useEffect, useContext, createContext, ReactNode, useState, UIEvent } from "react";
import useMessage from "@src/hooks/useMessage";
import { ItemSelect, SelectGet } from "@src/interfaces/components/table";
import { InputType } from "@src/types/components/table";
import { get } from "@src/services/http/client";
import { once } from "@src/utils/functions";
import useAbortController from "@src/hooks/useAbortController";

interface Props<T> {
  children: ReactNode;
  itemsProp: InputType<T>[];
}

type OnPopupScrollFun<T> = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>, item: ItemSelect<keyof T>) => Promise<void>;

interface Context<T> {
  items: InputType<T>[];
  onPopupScroll: OnPopupScrollFun<T>;
}

const createStateContext = once(<T extends {}>() => createContext({
  items: [],
  onPopupScroll: () => Promise.resolve(),
} as Context<T>));

export const useFormControl = <T extends {}>() => useContext(createStateContext<T>());

const FormControlProvider = <T extends {}>({ children, itemsProp }: Props<T>) => {
  const Context = createStateContext<T>();
  const message = useMessage();
  const abortController = useAbortController();
  const [items, setItems] = useState<InputType<T>[]>([]);
  const [notLoadMore, setNotLoadMore] = useState(false);

  useEffect(() => {
    if (!itemsProp.length || items.length) return;

    const init = async () => {
      try {
        const newItems = await Promise.all(itemsProp.map(async item => {
          if (item.type !== "select" || !item.url || !item.baseUrl) return item;

          const response = await get<SelectGet>({ baseUrl: item.baseUrl, url: item.url, abortController: abortController.current });

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
  }, [itemsProp, abortController, items, message]);

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

  return <Context.Provider value={{ items, onPopupScroll }}>{children}</Context.Provider>;
};

export default FormControlProvider;
