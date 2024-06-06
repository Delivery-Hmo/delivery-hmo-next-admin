"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as PaginationAnt } from "antd";
import { deleteCookie, setCookie } from "cookies-next";
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

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          const element = node as HTMLElement;

          if (element.id === "total") {
            const _total = element?.textContent || 0;

            setTotal(+_total);
            setCookie("totalDataTable", _total);
          }
        });
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(totalInterval);

      deleteCookie("activeId");
      deleteCookie("status");

      observer?.disconnect();
    };
  }, []);

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
              },
            });

            message.success("Registro actualizado con éxito!.");
          } catch (error) {
            message.error("Error al cambiar el estatus.");
            console.log(error);
          } finally {
            router.push(url);
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