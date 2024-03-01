
"use server";

import { Get } from "@src/interfaces/services/http";
import { get } from "@src/services/http";
import { TableProps } from "@src/interfaces/components/table";
import { cookies } from 'next/headers';
import { getCookie } from "cookies-next";
import Link from "next/link";

interface Document {
  id: string;
}

const TableServer = async <T extends Document>({ url, columns, urlEdit, urlDelete }: TableProps<T>) => {
  const { list, total } = await get<Get<T>>("companiesApi", url);
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;

  return (
    <>
      <div id="total" style={{ display: "none" }}>{total}</div>
      <table
        style={{
          width: "100%",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20
        }}
      >
        <thead>
          <tr>
            {
              columns.map((column) => (
                <th
                  key={column.key}
                  style={{ textAlign: "start" }}
                >
                  {column.title}
                </th>
              ))
            }
            {
              Boolean(urlEdit) && <th style={{ textAlign: "start" }}>
                Editar
              </th>
            }
            {
              Boolean(urlDelete) && <th style={{ textAlign: "start" }}>
                Eliminar
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {
            list.map((item) => {
              return <tr key={item.id}>
                {
                  columns.map((column) => (
                    <td key={column.key}>{item[column.key as keyof Document]}</td>
                  ))
                }
                {
                  Boolean(urlEdit) && <td>
                    <Link href={`${urlEdit}?id=${item.id}`!}>
                      Editar
                    </Link>
                  </td>
                }
                {
                  Boolean(urlDelete) && <td>
                    <Link href={`${urlDelete}?page=${page}&limit=${limit}&borrar=${item.id}`}>
                      Eliminar
                    </Link>
                  </td>
                }
              </tr>;
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default TableServer;