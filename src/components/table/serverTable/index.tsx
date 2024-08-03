
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Switch, /* Tag */ } from "antd";
import { Get } from "@src/interfaces/services/http";
import { get } from "@src/services/http";
import { TableProps } from "@src/interfaces/components/table";
//import { colorsBranchStatus, textsBranchStatus, urlImageDefaultProfile } from "@src/utils/constants";
import Image from "next/image";
//import { BranchStatus } from "@src/types";
import "./index.css";

type CellKey = "active" | "image" | "default";
type CellValue = string | number | boolean;

const cellRenderers: Record<CellKey, (value: CellValue, item: { id: string; }) => JSX.Element> = {
  "active": (value, item) => <Switch
    value={value as boolean}
    id={`activeId=${item.id}&active=${value}`}
  />,
  "image": (value) => (
    <Image
      alt={value?.toString()}
      src={value?.toString()}
      height={42}
      width={54}
      style={{
        borderRadius: 10,
        margin: 10,
        objectFit: "cover"
      }}
    />
  ),
  "default": (value) => <div>{value}</div>
};

const ServerTable = async <T extends { id: string; }>({ baseUrl, columns, url }: TableProps<T>) => {
  const pathname = getCookie("pathname", { cookies }) as string;
  const { list, total } = await get<Get<T>>({ baseUrl, url: `${pathname}/${url || "list"}` });

  return (
    <>
      <div className="table-container">
        <div className="scroll-container">
          <div id="total" style={{ display: "none" }}>{total}</div>
          <table className="ant-table" id="table-server">
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
                              cellRenderers[["active", "image"].includes(keyTd)
                                ? (keyTd as CellKey)
                                : "default"](value, item as { id: string; })
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
        </div>
      </div>
    </>
  );
};

export default ServerTable;