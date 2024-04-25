"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as PaginationAnt } from "antd";
import { deleteCookie, setCookie } from "cookies-next";
import useModal from "@src/hooks/useModal";
import useMessage from "@src/hooks/useMessage";
import { post } from "@src/services/http";

const Pagination = () => {
  const searchParams = useSearchParams();
  const modal = useModal();
  const message = useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const totalInterval = setInterval(() => {
      const totalElement = window.document.getElementById("total");
      const _total = totalElement?.textContent || 0;

      setTotal(+_total);
      setCookie("totalDataTable", _total);

      if (_total) {
        clearInterval(totalInterval);
      }
    }, 200);

    let tableObserver: MutationObserver | undefined;

    const tableInterval = setInterval(() => {
      const table: HTMLTableElement | null = document.getElementById("table") as HTMLTableElement;

      if (table) {
        clearInterval(tableInterval);

        tableObserver = new MutationObserver((mutations) => {
          if (!mutations.length) return;

          const lastMutation = mutations[mutations.length - 1];

          if (lastMutation.target.nodeName === "TBODY") {
            console.log(lastMutation.target.nodeName);
          }
        });

        tableObserver.observe(table, { childList: true, subtree: true });

        const dataTable: Record<string, any> = [];
        const { rows } = table;

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const { cells } = row;
          const itemDataTable: Record<string, any> = {};

          for (let j = 0; j < cells.length; j++) {
            const { id: key, innerText: value, children } = cells[j];

            if (!key) continue;

            if (key === "active") {
              const anchorElement = children[0];
              const ariaChecked = anchorElement.children[0].ariaChecked!;
              itemDataTable[key] = ariaChecked === "true";

              continue;
            }

            if (key === "image") {
              const imgElement = children[0] as HTMLImageElement;
              itemDataTable[key] = imgElement.alt;

              continue;
            }

            itemDataTable[key] = value;
          }

          dataTable.push(itemDataTable);
        }

        setCookie("dataTable", JSON.stringify(dataTable));
      }
    }, 200);

    return () => {
      setPage(1);
      setLimit(10);
      setTotal(0);

      clearInterval(totalInterval);
      clearInterval(tableInterval);

      deleteCookie("dataTable");
      deleteCookie("activeId");
      deleteCookie("status");

      tableObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const page = searchParams.get("pagina") || 1;
    const limit = searchParams.get("limite") || 10;
    const deleteId = searchParams.get("idBorrar");
    const activeId = searchParams.get("idActivo");
    const status = searchParams.get("estatus");

    setPage(+page);
    setLimit(+limit);

    if (deleteId) {
      modal.confirm({
        title: "¿Esta seguro de eliminar este registro?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onCancel: () => {
          router.push(`${pathname}?pagina=${page}&limite=${limit}`);
        }
      });
    }

    if (activeId) {
      modal.confirm({
        title: "¿Esta seguro de desactivar este registro?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onCancel: () => {
          deleteCookie("activeId");
          deleteCookie("status");

          router.push(`${pathname}?pagina=${page}&limite=${limit}`);
        },
        onOk: async () => {
          try {
            console.log(page, limit, status);
            await post({ baseUrlType: "companiesApi", url: `${pathname}/disable`, body: { active: !(status === "true") } });
            router.push(`${pathname}?pagina=${page}&limite=${limit}`);
          } catch (error) {
            message.error("Error al cambiar el estatus.");
            console.log(error);
          }
        }
      });
    }
  }, [searchParams, pathname, modal, router, message]);

  return (
    <PaginationAnt
      style={{ marginTop: 10 }}
      showSizeChanger
      pageSizeOptions={[5, 10, 25, 50, 100]}
      total={total}
      current={+page! || 1}
      pageSize={+limit! || 10}
      onChange={(_page, _limit) => {
        setCookie("page", _page);
        setCookie("limit", _limit);
        setPage(_page);
        setLimit(_limit);

        router.push(`${pathname}?pagina=${_page}&limite=${_limit}`);
      }}
    />
  );
};

export default Pagination;