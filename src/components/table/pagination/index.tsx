"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as PaginationAnt } from "antd";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import useModal from "@src/hooks/useModal";
import useMessage from "@src/hooks/useMessage";
import { patch } from "@src/services/http";

const Pagination = () => {
  const searchParams = useSearchParams();
  const modal = useModal();
  const message = useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const setCookieTable = useCallback((element: HTMLElement) => {
    const table = element as HTMLTableElement;

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
  }, []);

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

    const totalTable = setInterval(() => {
      const table = window.document.getElementById("table") as HTMLTableElement;

      if (table) {
        clearInterval(totalTable);
        setCookieTable(table);
      }
    }, 200);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          const element = node as HTMLElement;

          if (element.id === "total") {
            const _total = element?.textContent || 0;

            setTotal(+_total);
            setCookie("totalDataTable", _total);
          }

          if (element.id === "table") {
            setCookieTable(element);
          };
        });
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });

    return () => {
      setPage(1);
      setLimit(10);
      setTotal(0);

      clearInterval(totalInterval);

      deleteCookie("dataTable");
      deleteCookie("activeId");
      deleteCookie("status");

      observer?.disconnect();
    };
  }, [setCookieTable]);

  useEffect(() => {
    const page = searchParams.get("pagina") || 1;
    const limit = searchParams.get("limite") || 10;
    const activeId = searchParams.get("idActivo");
    const status = searchParams.get("estatus");
    const url = `${pathname}?pagina=${page}&limite=${limit}`;

    setPage(+page);
    setLimit(+limit);

    if (activeId) {
      modal.confirm({
        title: "¿Esta seguro de desactivar este registro?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onCancel: () => {
          deleteCookie("activeId");
          deleteCookie("status");

          router.push(url);
        },
        onOk: async () => {
          try {
            const newStatusActive = !(status === "true");

            await patch({
              baseUrlType: "companiesApi",
              url: `${pathname.split("?")[0]}/disable`,
              body: {
                id: activeId,
                active: newStatusActive
              }
            });

            let dataTable = JSON.parse(getCookie("dataTable")!) as Array<{ id: string, image: string | undefined; active: boolean; }>;

            dataTable = dataTable.map(l => ({
              ...l,
              image: l.image?.replace("imagenesPerfil/", "imagenesPerfil%2F"),
              active: activeId === l.id ? newStatusActive : l.active
            }));

            setCookie("dataTable", dataTable);

            message.success("Registro actualizado con éxito!.");
            router.push(url);
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