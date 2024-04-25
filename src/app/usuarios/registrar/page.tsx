"use client"

import { useState } from 'react'
import { Card, Form, message } from 'antd'
import DynamicForm from '@src/components/dynamicForm';

const Register = () => {
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async () => {
    if (saving) return;
    setSaving(true);
    try {
      message.success('Empresa guardada con éxito.', 4);

    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <DynamicForm
        form={form}
        layout='vertical'
        loading={saving}
        onFinish={onFinish}
        justify="center"
        inputs={[
          {
            typeControl: 'input',
            typeInput: 'text',
            label: 'Nombre',
            name: 'name',
            rules: [{ required: true, message: 'Favor de escribir el nombre de la empresa.' }],
            md: 8
          }
        ]}
      />
    </Card>
  );
};

export default Register;