import { BaseUrlTypes } from "@src/types/services/htts";

export const baseUrlCompaniesApi: string = "http://localhost:3001/";

export const baseUrlsApis: Record<BaseUrlTypes, string> = {
  "companiesApi": "http://localhost:3001/"
};

export const firstPage = "?page=1&limit=5";
