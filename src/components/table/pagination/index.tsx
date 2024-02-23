"use client";

import useModal from "@src/hooks/useModal";
import { Pagination as PaginationAnt } from 'antd';
import { setCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = () => {
  const modal = useModal();

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const router = useRouter();
  const pathname = usePathname();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalElement = window.document.getElementById("total");

    setTotal(+totalElement?.textContent! || 0);
  }, []);

  console.log(total);

  useEffect(() => {
    const idDelete = searchParams.get('borrar');

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
      showSizeChanger
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