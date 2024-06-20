"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as PaginationAnt } from "antd";
import { setCookie } from "cookies-next";
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
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let observer: MutationObserver | null = null;

    const totalInterval = setInterval(() => {
      const totalElement = window.document.getElementById("total");
      const _total = totalElement?.textContent || 0;

      setTotal(+_total);
      setCookie("totalDataTable", _total);

      if (!totalElement || !_total) return;

      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const element = mutation.target as HTMLElement;
          const newTotal = element.textContent;

          if (newTotal) {
            setTotal(+newTotal);
            setCookie("totalDataTable", newTotal);
          };
        });
      });

      observer.observe(totalElement, {
        attributeFilter: ["id"],
        childList: true,
        subtree: true,
        characterData: true
      });

      clearInterval(totalInterval);
    }, 1);

    //hacer un set interval para el onClick de los checks de la tabla

    /* const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target as HTMLElement;

        console.log(element);

        if (element.id?.includes("active")) {
          console.log(element.id);
        }

        if (element.id?.includes("total")) {
          console.log(element.id);
        }
      });
    });

    observer.observe(document, {
      attributeFilter: ["id"],
      childList: true,
      subtree: true,
      characterData: true
    }); */

    return () => {
      clearInterval(totalInterval);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const _page = searchParams.get("pagina") || 1;
    const _limit = searchParams.get("limite") || 10;

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