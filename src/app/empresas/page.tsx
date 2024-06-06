import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";
import { baseColumnsFilters, baseTableFilters } from "@src/utils/constants";

const Companies = () => {
  return (
    <Table<UserAdmin>
      baseUrlType="companiesApi"
      filters={baseTableFilters}
      columns={baseColumnsFilters}
    />
  );
};

export default Companies;