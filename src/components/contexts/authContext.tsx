import { createContext, useContext } from "react";
import { UserCredentials } from "../../types/index";

interface AuthContextType {
  token: string | null;
  signup: (credentials: UserCredentials) => Promise<void>;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}

export const authContext = createContext<AuthContextType>({
  token: null,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export function useAuth(): AuthContextType {
  return useContext(authContext);
}
