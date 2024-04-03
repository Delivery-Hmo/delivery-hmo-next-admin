import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import FullLoader from "@src/components/fullLoader";
import { getCurrentUser } from "@src/services/firebase/auth";
import { set } from "firebase/database";

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
    const init = async () => {
      try {
        const _user = await getCurrentUser();

        setUser(_user);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

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