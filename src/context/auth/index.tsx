import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth } from "@src/firebase";
import FullLoader from "@src/components/fullLoader";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<{ user: User | null, loading: boolean; }>({
  user: null,
  loading: true
});

const AuthProvider: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (loading) return;

    if (user && pathname === "/") router.push("/inicio");

    if (!user) router.push("/");
  }, [pathname, user, loading]);

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
  }, [pathname, searchParams]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);