import { useRouter } from "next/navigation";

const UserRegister = () => {
  const router = useRouter();

  return (
    <a
      style={{
        marginLeft: "200px",
        fontSize: "16px",
        color: "#0070f3",
        textDecoration: "none",
        cursor: "pointer",
      }}
      onClick={() => router.push("/usuarios/registrar")}
    >
      @ Registrarse
    </a>
  );
};

export default UserRegister;