"use client";

import { FC } from 'react';
import { Button, message, Space, Modal } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteButton from '../../deleteButton';
import { useRouter } from "next/navigation";

interface Props {
  record: any;
  onDeleted: () => void;
  fun: () => Promise<any>;
  pathEdit: string;
}

const dialogDelete = (fun: () => Promise<any>) =>
  new Promise<void>((resolve) => Modal.confirm({
    title: 'Eliminar',
    icon: <ExclamationCircleOutlined />,
    content: '¿Seguro que deseas eliminar este registro?',
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    onOk: async () => {
      try {
        await fun();
        message.success("Registro eliminado con exito!");
        resolve();
      } catch (error) {
        console.error(error);
        message.error("Error al eliminar el registro.", 4);
      }
    },
  }));

const TableActionButtons: FC<Props> = ({ record, onDeleted, fun, pathEdit }) => {
  const router = useRouter();

  const del = async () => {
    await dialogDelete(fun);
    onDeleted();
  };

  return (
    <Space>
      <Button
        icon={<EditOutlined />}
        shape="circle"
        onClick={() => router.push(pathEdit)}
        size="middle"
        style={{ color: '#fff', backgroundColor: '#ec9822 ' }}
      />
      <DeleteButton onClick={del} />
    </Space>
  );
};

export default TableActionButtons;