import { useAuth } from "@src/context/auth";
import FullLoader from "../../components/fullLoader";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RefreshToken = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;

    user.getIdToken(true)
      .then((newToken) => {
        setCookie("token", newToken);
        const decodedPath = window.decodeURIComponent(router.query.redirect as string);
        router.replace(decodedPath);
      })
      .catch(() => {
        router.replace('/');
      });
  }, [user]);

  return (
    <FullLoader />
  );
};

export default RefreshToken;