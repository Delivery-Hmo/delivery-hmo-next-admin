
"use server";

import Link from "next/link";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Switch } from "antd";
import { Get } from "@src/interfaces/services/http";
import { get } from "@src/services/http";
import { TableProps } from "@src/interfaces/components/table";
import { urlImageDefaultProfile } from "@src/utils/constants";

const ServerTable = async <T extends { id?: string; }>({ baseUrlType, columns, showEdit, showDelete }: TableProps<T>) => {
  const page = getCookie("pagina", { cookies }) as string;
  const limit = getCookie("limite", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;

  const { list, total } = await get<Get<T>>({ baseUrlType, url: `${pathname}/list` });

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
              showEdit && <th style={{ textAlign: "start" }}>
                Editar
              </th>
            }
            {
              showDelete && <th style={{ textAlign: "start" }}>
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
                          typeof value === "boolean" && column.key === "active"
                            ? <Link href={`${pathname}?pagina=${page}&limite=${limit}&idActivo=${item.id}&estatus=${value}`}>
                              <Switch checked={value} />
                            </Link>
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
                  showEdit && <td
                    style={{
                      width: 50
                    }}
                  >
                    <Link href={`${pathname}/editar?id=${item.id}`!}>
                      Editar
                    </Link>
                  </td>
                }
                {
                  showDelete && <td
                    style={{
                      width: 50
                    }}
                  >
                    <Link href={`${pathname}?pagina=${page}&limite=${limit}&idBorrar=${item.id}`}>
                      Borrar
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

export default ServerTable;