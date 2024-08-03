import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import FullLoader from "@src/components/fullLoader";
import { deleteCookie, setCookie, getCookies, getCookie } from "cookies-next";
import { auth } from "@src/services/firebase";



interface Props {
  children: ReactNode;
}

interface Context {
  user: User | null,
  loading: boolean;
}

const AuthContext = createContext<Context>({
  user: null,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async user => {
      try {
        setUser(user);

        if (!user) {
          Object.keys(getCookies()).forEach((key) => deleteCookie(key));

          router.push("/");
          return;
        }

        const token = await user.getIdToken();

        setCookie("token", token);
        setCookie("uid", user.uid);
        setCookie("refreshToken", user.refreshToken);

        if (pathname === "/") router.push("/inicio");

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      uns();
    };
  }, [pathname, router]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
