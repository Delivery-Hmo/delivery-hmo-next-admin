
"use server";

import { Get } from "@src/interfaces/services/http";
import { get } from "@src/services/http";
import { TableProps } from "@src/interfaces/components/table";
import { cookies } from 'next/headers';
import { getCookie } from "cookies-next";
import Link from "next/link";
import { Switch } from "antd";
import { urlImageDefaultProfile } from "@src/utils/constanst";

const TableServer = async <T extends { id?: string; }>({ url, columns, urlEdit, urlDelete }: TableProps<T>) => {
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
                  key={column.key.toString()}
                  style={{
                    textAlign: "start",
                    width: "40%"
                  }}
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
              const _item = (item as Record<string, string | number | boolean>);

              return <tr key={item.id}>
                {
                  columns.map((column) => {
                    const value = _item[column.key] as string | number | boolean;

                    return (
                      <td key={column.key.toString()}>
                        {
                          typeof value === "boolean"
                            ? <Switch checked={value} disabled />
                            : column.key === "image"
                              ? <img
                                src={value.toString() || urlImageDefaultProfile}
                                height={50}
                                style={{ borderRadius: 10 }}
                              />
                              : value
                        }
                      </td>
                    );
                  })
                }
                {
                  Boolean(urlEdit) && <td
                    style={{
                      width: 50
                    }}
                  >
                    <Link href={`${urlEdit}?id=${item.id}`!}>
                      Editar
                    </Link>
                  </td>
                }
                {
                  Boolean(urlDelete) && <td
                    style={{
                      width: 50
                    }}
                  >
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