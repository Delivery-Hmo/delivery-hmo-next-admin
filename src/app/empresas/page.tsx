import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";

const Companies = () => {
  return (
    <Table<UserAdmin>
      baseUrlType="companiesApi"
      columns={[
        {
          key: "id",
          title: "ID",
        },
        {
          key: "name",
          title: "Nombre",
        },
        {
          key: "active",
          title: "Activo",
        },
        {
          key: "image",
          title: "Imagen",
        }
      ]}
    />
  );
};

export default Companies;