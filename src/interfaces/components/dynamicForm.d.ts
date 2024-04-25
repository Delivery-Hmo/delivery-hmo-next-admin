import { CSSProperties } from 'react';
import { TypeControl, TypeInput, UploadListType } from "@src/types";
import { FormRule } from 'antd';

export interface CustomInput {
    typeControl: TypeControl;
    typeInput?: TypeInput;
    value?: any;
    name: string;
    md?: number;
    label?: string;
    options?: Option[];
    show?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rules?: FormRule[];
    onChange?: (value: any) => void;
    styleFI?:  CSSProperties;
    required?: boolean;
    accept?: string;
    maxCount?: number;
    multiple?: boolean;
    loading?: boolean;
    listType?: UploadListType;
  }
  
  export interface Option {
    value: string | number;
    text: string;
  }