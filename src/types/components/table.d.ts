import { ItemInput, ItemSelect } from "../../interfaces/components/table";

export type InputType<T> = ItemInput<keyof T> | ItemSelect<keyof T>;