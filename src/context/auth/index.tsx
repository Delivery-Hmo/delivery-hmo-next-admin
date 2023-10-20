import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      if (user && pathname === "/") {
        router.push('/inicio');
      }

      if (!user) {
        router.push('/');
      }

      setUser(user);
      setLoading(false);
    });

    return () => {
      uns();
    };
  }, []);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);