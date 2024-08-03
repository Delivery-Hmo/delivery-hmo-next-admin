
import { UIEvent } from "react";
import { Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { InputType } from "@src/types/components/table";
import { ItemSelect } from "@src/interfaces/components/table";

interface PropsItemFilters<T> {
  item: InputType<T>;
  onPopupScroll: (e: UIEvent<HTMLDivElement, globalThis.UIEvent>, item: ItemSelect<keyof T>) => Promise<void>;
}

const FormControl = <T extends {}>({ item, onPopupScroll }: PropsItemFilters<T>) => {
  const { name, type } = item;
  const nameString = name as string;

  return (
    <>
      {
        (!type || type === "input") && <FormItem name={nameString}>
          <Input
            placeholder={(item.placeholder || "") as string}
          />
        </FormItem>
      }
      {
        type === "select" && <FormItem name={nameString}>
          <Select
            options={item.options}
            loading={item.loading}
            placeholder={item.placeholder}
            onPopupScroll={e => onPopupScroll(e, item)}
            showSearch={item.showSearch}
            filterOption={(input, option) =>
              ((option?.label as string) || '').toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          />
        </FormItem>
      }
    </>
  );
};

export default FormControl;