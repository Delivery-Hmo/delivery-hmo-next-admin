"use client";

import useModal from "@src/hooks/useModal";
import { Pagination as PaginationAnt } from 'antd';
import { setCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = () => {
  const searchParams = useSearchParams();
  const modal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const totalElement = window.document.getElementById("total");
    const total = totalElement?.textContent || 0;

    setTotal(+total);

    return () => {
      setCookie("page", 1);
      setCookie("limit", 5);
      setPage(1);
      setLimit(5);
      setTotal(0);
    };
  }, []);

  useEffect(() => {
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 5;
    const idDelete = searchParams.get('borrar');

    const totalElement = window.document.getElementById("total");
    const total = totalElement?.textContent || 0;

    setCookie("page", page);
    setCookie("limit", limit);
    setPage(+page);
    setLimit(+limit);
    setTotal(+total);

    if (!idDelete) return;

    const deleteRow = () => {
      modal.confirm({
        title: '¿Esta seguro de eliminar este registro?',
        okText: 'Aceptar',
        cancelText: 'Cancelar',
        onCancel: () => {
          router.push(`${pathname}?page=${page}&limit=${limit}`);
        }
      });
    };

    deleteRow();
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
        setCookie('page', page);
        setCookie('limit', pageSize);

        router.push(`${pathname}?page=${page}&limit=${pageSize}`);
      }}
    />
  );
};

export default Pagination;