import Table from "@src/components/table";
import { BranchOffice, UserAdmin } from "@src/interfaces/users";
import { baseColumnsTable, baseTableFilters } from "@src/utils/constants";

const BranchOffices = () => {
  return (
    <Table<BranchOffice>
      filters={[
        ...baseTableFilters,
        {
          typeInput: "select",
          label: "Empresa",
          name: "userAdmin"
        }
      ]}
      baseUrlType="companiesApi"
      columns={baseColumnsTable}
    />
  );
};

export default BranchOffices;