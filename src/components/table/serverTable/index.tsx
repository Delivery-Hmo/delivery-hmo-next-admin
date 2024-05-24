
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Switch, /* Tag */ } from "antd";
import { Get } from "@src/interfaces/services/http";
import { getCache } from "@src/services/http";
import { TableProps } from "@src/interfaces/components/table";
//import { colorsBranchStatus, textsBranchStatus, urlImageDefaultProfile } from "@src/utils/constants";
import Image from "next/image";
import Link from "next/link";
//import { BranchStatus } from "@src/types";
import "./index.css";

const ServerTable = async <T extends { id?: string; }>({ baseUrlType, columns, url }: TableProps<T>) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;
  const cache = getCache<Get<T>>({ baseUrlType, url: `${pathname}/${url || "list"}`, page: +page, limit: +limit });
  const { list, total } = await cache();

  return (
    <>
      <div id="total" style={{ display: "none" }}>{total}</div>
      <table className="ant-table">
        <thead>
          <tr className="tr">
            {
              columns.map((column) => (
                <th
                  className="th"
                  key={column.key.toString()}
                  style={{
                    textAlign: "start",
                    width: "50%"
                  }}
                >
                  {column.title}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            list.map((item) => {
              const _item = item as Record<string, string | number | boolean>;
              //const branchStatus = _item.estatus as BranchStatus | undefined;

              return <tr key={item.id}>
                {
                  columns.map((column) => {
                    const value = _item[column.key] as string | number | boolean;
                    const keyTd = column.key.toString();

                    return (
                      <td
                        key={keyTd}
                        id={keyTd}
                      >
                        {
                          typeof value === "boolean" && keyTd === "active"
                            ? <Link
                              href={`${pathname}?pagina=${page}&limite=${limit}&idActivo=${item.id}&estatus=${value}`}
                            >
                              <Switch value={value} />
                            </Link>
                            : keyTd === "image"
                              ? <Image
                                alt={value.toString()}
                                src={value.toString()}
                                height={48}
                                width={64}
                                style={{ borderRadius: 10 }}
                              />
                              : value
                        }
                      </td>
                    );
                  })
                }
              </tr>;
              /*  {
                 showStatus && <td>
                   <Link href={`${pathname}/estatus`}>
                     <Tag
                       color={colorsBranchStatus[branchStatus!]}
                       title={textsBranchStatus[branchStatus!]}
                     >
                       {textsBranchStatus[branchStatus!]}
                     </Tag>
                   </Link>
                 </td>;
               } */
            })

          }
        </tbody>
      </table>
    </>
  );
};

export default ServerTable;