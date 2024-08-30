import Table from "@src/components/table";
import { UserDeliveryMan } from "@src/interfaces/models/users";
import { InputType } from "@src/types/components/table";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";
import { useMemo } from "react";

const DeliveryMan = () => {
  const filters = useMemo<InputType<UserDeliveryMan>[]>(() => {
    const filters: InputType<UserDeliveryMan>[] = [
      ...baseFiltersTable,
      {
        type: "select",
        label: "Empresa",
        name: "userAdmin",
        baseUrl: "companiesApi",
        url: "/empresas/listaFiltrosSucursales",
        loading: true,
        showSearch: true,
      }
    ];

    return filters;
  }, []);

  return (
    <Table<UserDeliveryMan>
      filters={filters}
      baseUrl="companiesApi"
      columns={baseColumnsTable}
      url="listBySuperAdmin"
    />
  );
};

export default DeliveryMan;