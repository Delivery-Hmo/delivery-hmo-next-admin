import React from 'react';
import HeaderView from "@src/components/headerView";
import Table from "@src/components/table";

const RegisterCompany = (searchParams: { [key: string]: string | string[] | undefined; }) => {
  return (
    <>
      <HeaderView
        title="Registrar empresa"
      />
    </>
  );
};

export default RegisterCompany;