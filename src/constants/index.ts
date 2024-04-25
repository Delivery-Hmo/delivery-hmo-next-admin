import { FormRule } from "antd";

export const urlImageDefaultProfile = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2F1467646262_522853_1467646344_noticia_normal.jpg?alt=media&token=f6e761ad-95c5-462f-bc39-0e889ac30a5c";

export const rulePhoneInput: FormRule = {
  required: true,
  message: 'El número telefónico tiene que ser de 10 dígitos.',
  validator: (rule, value?: string) => value?.length !== 10 ? Promise.reject(rule.message) : Promise.resolve(),
} as const;
export const ruleMaxLength: FormRule = {
  max: 300,
  message: "El texto no puede tener más de 300 caracteres."
} as const;
export const ruleEmail: FormRule = {
  required: true,
  message: 'Favor de escribir un correo electrónico válido.',
  type: "email"
} as const;

