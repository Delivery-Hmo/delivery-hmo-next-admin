import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";

const Companies = () => {
  return (
    <Table<UserAdmin>
      url="userAdmin/list"
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
      urlEdit="/empresas/editar"
      urlDelete="/empresas"
    //eliminar urlDelete sacando la base de la url de urlEdit.
    />
  );
};

export default Companies;