import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";

const Companies = () => {
  return (
    <Table<UserAdmin>
      baseUrlType="companiesApi"
      filters={baseFiltersTable}
      columns={baseColumnsTable}
    />
  );
};

export default Companies;