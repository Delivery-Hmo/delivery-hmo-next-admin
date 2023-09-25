import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from "@src/app/firebase";
import FullLoader from "@src/app/components/fullLoader";

interface Props {
  children: ReactNode;
  onLoadUser: (user: User | null) => void;
}

const AuthContext = createContext<{ user: User | null, loading: boolean; }>({
  user: null,
  loading: true,
});

const AuthProvider: FC<Props> = ({ children, onLoadUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      setUser(user);
      onLoadUser(user);
      setLoading(false);

      if (user) {
        router.push('/home');
      } else {
        router.push('/');
      }
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