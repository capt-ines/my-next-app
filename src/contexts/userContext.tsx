import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/component";
import type { Session, User } from "@supabase/supabase-js";

const supabase = createClient();

interface UserContextType {
  user: User | null;
  username: string | null;
}
interface ProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

const Context = createContext<UserContextType>({ user: null, username: null });

const Provider: React.FC<ProviderProps> = ({
  children,
  initialUser = null,
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [username, setUsername] = useState<string | null>(
    initialUser?.user_metadata?.username ?? null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setUsername(data.user.user_metadata?.username ?? null);
      } else {
        setUser(null);
        setUsername(null);
      }
    };

    if (!initialUser) fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        setUser(session?.user ?? null);
        setUsername(session?.user?.user_metadata?.username ?? null);
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [initialUser]);

  return (
    <Context.Provider value={{ user, username }}>{children}</Context.Provider>
  );
};

export const useUser = () => useContext(Context);
export default Provider;
