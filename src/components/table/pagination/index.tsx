"use client";

import { useEffect, useState } from "react";
import useModal from "@src/hooks/useModal";
import { Pagination as PaginationAnt, message } from "antd";
import { setCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { post } from "@src/services/http";

const Pagination = () => {
  const searchParams = useSearchParams();
  const modal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalElement = window.document.getElementById("total");
      const _total = totalElement?.textContent || 0;

      if (_total !== 0) {
        setTotal(+_total);
        clearInterval(interval);
      };
    }, 200);

    return () => {
      setCookie("page", 1);
      setCookie("limit", 5);
      setPage(1);
      setLimit(5);
      setTotal(0);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const page = searchParams.get("pagina") || 1;
    const limit = searchParams.get("limite") || 5;
    const idDelete = searchParams.get("idBorrar");
    const idActive = searchParams.get("idActivo");
    const status = searchParams.get("estatus");

    setCookie("page", page);
    setCookie("limit", limit);
    setCookie("pathname", pathname);
    setPage(+page);
    setLimit(+limit);

    if (idDelete) {
      modal.confirm({
        title: "¿Esta seguro de eliminar este registro?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onCancel: () => {
          router.push(`${pathname}?pagina=${page}&limite=${limit}`);
        }
      });
    }

    if (idActive) {
      modal.confirm({
        title: "¿Esta seguro de desactivar este registro?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        onCancel: () => {
          router.push(`${pathname}?pagina=${page}&limite=${limit}`);
        },
        onOk: async () => {
          try {
            await post({ baseUrlType: "companiesApi", body: { active: !(status === "true") } });
          } catch (error) {
            console.log(error);
            message.error("Error al cambiar el estatus.");
          } finally {
            router.push(`${pathname}?pagina=${page}&limite=${limit}`);
          }
        }
      });
    }
  }, [searchParams, pathname]);

  return (
    <PaginationAnt
      style={{ marginTop: 10 }}
      showSizeChanger
      pageSizeOptions={[5, 10, 25, 50, 100]}
      total={total}
      current={+page! || 1}
      pageSize={+limit! || 5}
      onChange={(page, pageSize) => {
        setCookie("page", page);
        setCookie("limit", pageSize);

        router.push(`${pathname}?pagina=${page}&limite=${pageSize}`);
      }}
    />
  );
};

export default Pagination;