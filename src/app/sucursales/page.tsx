import Table from "@src/components/table";
import { BranchOffice } from "@src/interfaces/models/users";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";

const BranchOffices = () => {
  return (
    <Table<BranchOffice>
      filters={[
        ...baseFiltersTable,
        {
          typeInput: "select",
          label: "Empresa",
          name: "userAdmin",
        }
      ]}
      baseUrlType="companiesApi"
      columns={baseColumnsTable.filter((column) => column.key !== "image")}
    />
  );
};

export default BranchOffices;