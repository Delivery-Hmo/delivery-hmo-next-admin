import { Column } from "@src/interfaces/components/table";
import { User, UserAdmin } from "@src/interfaces/users";
import { BranchStatus, Item } from "@src/types";
import { BaseUrlTypes } from "@src/types/services/http";
import { PresetColorType } from "antd/es/_util/colors";
import { LiteralUnion } from "antd/es/_util/type";

export const baseUrlCompaniesApi: string = "http://localhost:3001/";

export const baseUrlsApis: Record<BaseUrlTypes, string> = {
  "companiesApi": "http://localhost:3001",
  "refreshTokenApi": "https://securetoken.googleapis.com/v1"
} as const;

export const firstPage = "?pagina=1&limite=10";

export const urlImageDefaultProfile = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2F1467646262_522853_1467646344_noticia_normal.jpg?alt=media&token=f6e761ad-95c5-462f-bc39-0e889ac30a5c";

export const colorsBranchStatus: Record<BranchStatus, LiteralUnion<PresetColorType>> = {
  "validating-images": "orange",
  "hidden-in-app": "yellow",
  "showing-in-app": "green"
} as const;

export const textsBranchStatus: Record<BranchStatus, string> = {
  "validating-images": "Validando imagenes",
  "hidden-in-app": "Oculto en app",
  "showing-in-app": "Mostrando en app"
} as const;

export const baseTableFilters: Item<keyof UserAdmin>[] = [
  {
    name: "id",
    placeholder: "ID",
    label: "ID"
  },
  {
    name: "name",
    placeholder: "Nombre",
    label: "Nombre"
  },
  {
    name: "email",
    placeholder: "Correo",
    label: "Correo"
  },
  {
    name: "phone",
    placeholder: "Teléfono",
    label: "Teléfono"
  },
  {
    name: "rfc",
    placeholder: "RFC",
    label: "RFC",
  }
] as const;

export const baseColumnsFilters: Column<User>[] = [
  {
    key: "id",
    title: "ID"
  },
  {
    key: "name",
    title: "Nombre"
  },
  {
    key: "email",
    title: "Correo"
  },
  {
    key: "phone",
    title: "Teléfono"
  },
  {
    key: "rfc",
    title: "RFC",
  },
  {
    key: "active",
    title: "Activo"
  },
  {
    key: "image",
    title: "Imagen"
  }
] as const;

export const filterKeys = ["page", "limit", "id", "name", "email", "phone", "rfc"];

export const allUrlParamKeys = [...filterKeys, "pathname"] as const;
