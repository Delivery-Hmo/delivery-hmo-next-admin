import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import FullLoader from "../../components/fullLoader";
import { auth } from "../../firebase";
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

const AuthContext = createContext<{ user: User | null, loading: boolean }>({
  user: null,
  loading: true
});

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        router.push('/home');
      } else {
        router.push('/');
      }

      setTimeout(() => {
        setUser(user);
        setLoading(false);
      }, 200);
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