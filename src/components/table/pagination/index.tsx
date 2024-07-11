"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as PaginationAnt } from "antd";
import { setCookie } from "cookies-next";
import useModal from "@src/hooks/useModal";
import useMessage from "@src/hooks/useMessage";
import { patch } from "@src/services/http";
import queryString from "query-string";

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
    let observerTotal: MutationObserver | null = null;
    let observerTable: MutationObserver | null = null;

    const totalInterval = setInterval(() => {
      const totalElement = window.document.getElementById("total");

      if (!totalElement) return;

      clearInterval(totalInterval);

      const _total = totalElement?.textContent || 0;

      setTotal(+_total);
      setCookie("totalDataTable", _total);

      observerTotal = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const element = mutation.target as HTMLElement;
          const newTotal = element.textContent;


          if (newTotal) {
            setTotal(+newTotal);
            setCookie("totalDataTable", newTotal);
          };
        });
      });

      observerTotal.observe(totalElement, {
        attributeFilter: ["id"],
        childList: true,
        subtree: true,
        characterData: true
      });
    }, 1);

    const tableInterval = setInterval(() => {
      const tableElement = window.document.getElementById("table-server");

      if (!tableElement) return;

      clearInterval(tableInterval);

      observerTable = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          const element = mutation.target as HTMLElement | null;

          if (!element) continue;

          const elementId = element.id;

          if (elementId.includes("activeId=") && mutation.addedNodes.length) {
            const { activeId, active: activeString } = queryString.parse(elementId);
            const active = activeString === "true";

            modal.confirm({
              title: "¿Esta seguro de desactivar este registro?",
              okText: "Aceptar",
              cancelText: "Cancelar",
              onOk: async () => {
                try {
                  await patch({
                    baseUrlType: "companiesApi",
                    url: `${pathname.split("?")[0]}/disable`,
                    body: { id: activeId, active: !active }
                  });

                  message.success("Registro actualizado con éxito!.");
                  router.refresh();
                } catch (error) {
                  message.error("Error al cambiar el estatus.");
                  console.log(error);
                }
              }
            });
          }
        }
      });

      observerTable.observe(document, {
        attributeFilter: ["id"],
        childList: true,
        subtree: true,
      });
    }, 1);

    return () => {
      clearInterval(totalInterval);
      clearInterval(tableInterval);

      observerTotal?.disconnect();
    };
  }, []);

  useEffect(() => {
    const _page = searchParams.get("pagina");
    const _limit = searchParams.get("limite");

    if (!_page || !_limit) {
      router.push(`${pathname}?pagina=1&limite=10`);
      return;
    }

    setPage(+_page);
    setLimit(+_limit);
  }, [searchParams]);

  return (
    <PaginationAnt
      style={{ marginTop: 10 }}
      showSizeChanger
      pageSizeOptions={[5, 10, 25, 50, 100]}
      total={total}
      current={page}
      pageSize={limit}
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