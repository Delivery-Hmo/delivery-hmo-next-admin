import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import { auth } from "@src/firebase";
import FullLoader from "@src/components/fullLoader";
import { setCookie, deleteCookie } from 'cookies-next';

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

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie('token', token);
      } else {
        deleteCookie('token');
      }

      setUser(user);
      setLoading(false);
      onLoadUser(user);
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