import Table from "@src/components/table";
import { UserDeliveryMan } from "@src/interfaces/models/users";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";

const DeliveryMan = () => {
  return (
    <Table<UserDeliveryMan>
      filters={
        baseFiltersTable
      }
      baseUrlType="companiesApi"
      columns={
        baseColumnsTable
      }
    />
  );
};

export default DeliveryMan;