import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import FullLoader from "@src/components/fullLoader";
import { deleteCookie, setCookie } from "cookies-next";
import { auth } from "@src/services/firebase";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<{ user: User | null, loading: boolean; }>({
  user: null,
  loading: true
});

const AuthProvider: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      try {
        setUser(user);

        if (user) {
          const token = await user.getIdToken();

          setCookie("token", token);

          if (pathname === "/") {
            router.push("/inicio");
          }

          return;
        }

        deleteCookie("token");
        deleteCookie("page");
        deleteCookie("limit");
        deleteCookie("pathname");

        router.push("/");
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

  useEffect(() => {
    if (loading) return;

    if (user && pathname === "/") router.push("/inicio");

    if (!user) router.push("/");
  }, [pathname, router, user, loading]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);