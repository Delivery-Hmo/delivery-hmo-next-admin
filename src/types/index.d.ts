import { ItemInput, ItemSelect } from "@src/interfaces/components/table";

export type SearchParams = { [key: string]: string | string[] | undefined; };

export type BranchStatus = "validating-images" | "showing-in-app" | "hidden-in-app";

export type Item<K> = ItemInput<K> | ItemSelect<K>;

export type SelectNativeProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
