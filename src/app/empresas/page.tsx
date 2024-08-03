import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/models/users";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";

const Companies = () => {
  return (
    <Table<UserAdmin>
      baseUrl="companiesApi"
      filters={baseFiltersTable}
      columns={baseColumnsTable}
    />
  );
};

export default Companies;