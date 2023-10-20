'use client';
import styles from './styles.module.css';
import React, { useState } from 'react';
import { App, Button, Card, Form, Input } from "antd";
import useIsSmallScreen from "@src/hooks/useIsSmallScreen";
import { signInWithEmail } from "@src/firebase/auth";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const isSmallScreen = useIsSmallScreen();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const onFinish = async (values: User) => {
    if (loading) return;

    setLoading(true);

    try {
      const { email, password } = values;
      const { error } = await signInWithEmail(email, password);

      if (error) {
        message.error("Error al iniciar sesión.");
        return;
      }

      router.push("/inicio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} style={{ width: isSmallScreen ? 360 : 640 }}>
        <Card>
          <h2 style={{ color: "#304878" }}>Bienvenido</h2>
          <hr />
          <Form
            style={{ paddingTop: 10 }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<User>
              label="Correo"
              name="email"
              rules={[{ type: 'email', required: true, message: 'Correo válido requerido!' }]}
            >
              <Input autoComplete="email" />
            </Form.Item>
            <Form.Item<User>
              label="Contraseña"
              style={{ paddingTop: "10px" }}
              name="password"
              rules={[{ required: true, message: 'Contraseña requerida!' }]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <br />
            <Button htmlType="submit" type="primary" style={{ width: "100%" }} loading={loading}>Entrar</Button>
          </Form>
        </Card>
      </Card>
    </div>
  );
};

export default Login;