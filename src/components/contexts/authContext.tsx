import React, { useState, useEffect, createContext, useContext } from "react";
import { URL_BASE, tokenKey } from "../../constants";
import { AuthResponse, UserCredentials } from "../../types/index";

interface AuthContextType {
  token: string | null;
  signup: (credentials: UserCredentials) => Promise<void>;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const authContext = createContext<AuthContextType>({
  token: null,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function signup(credentials: UserCredentials): Promise<void> {
    await authenticate(credentials, "register");
  }

  async function login(credentials: UserCredentials): Promise<void> {
    await authenticate(credentials, "login");
  }

  async function authenticate(
    { username, password }: UserCredentials,
    endpoint: "register" | "login"
  ): Promise<void> {
    const url = `${URL_BASE}/auth/${endpoint}`;
    console.log("es es el endpoint" , url)
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body: AuthResponse = await response.json();
      setToken(body.access_token);
      window.localStorage.setItem(tokenKey, body.access_token);
    } else {
      const error = await response.json();
      throw new Error(error.message || "Authentication failed");
    }
  }

  function logout(): void {
    setToken(null);
    window.localStorage.removeItem(tokenKey);
  }

  return (
    <authContext.Provider value={{ token, signup, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(authContext);
}
