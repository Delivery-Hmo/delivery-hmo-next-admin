"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Form, Input } from "antd";
import styles from "./styles.module.css";
import useIsSmallScreen from "@src/hooks/useIsSmallScreen";
import useMessage from "@src/hooks/useMessage";
import { signInWithEmail } from "@src/services/firebase/auth";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const isSmallScreen = useIsSmallScreen();
  const message = useMessage();
  const [loading, setLoading] = useState(false);

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
              rules={[{ type: "email", required: true, message: "Correo válido requerido!" }]}
            >
              <Input autoComplete="email" />
            </Form.Item>
            <Form.Item<User>
              label="Contraseña"
              style={{ paddingTop: "10px" }}
              name="password"
              rules={[{ required: true, message: "Contraseña requerida!" }]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <br />
            <Button htmlType="submit" type="primary" style={{ width: "100%" }} loading={loading}>Entrar</Button>
            <br />
            <a style={{
              marginLeft: "200px", fontSize: "16px", color: "#0070f3", textDecoration: "none", cursor: "pointer",
            }}
              onClick={() => router.push("/usuarios/registrar")}
            >
              @ Registrarse
            </a>
          </Form>
        </Card>
      </Card>
    </div>
  );
};

export default Login;