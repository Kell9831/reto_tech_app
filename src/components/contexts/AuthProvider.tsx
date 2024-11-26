import React, { useState, useEffect } from "react";
import { authContext } from "./authContext"; 
import { URL_BASE, tokenKey } from "../../constants"; 
import { AuthResponse, UserCredentials } from "../../types/index";

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [token, setToken] = useState<string | null>(() => {
    return window.localStorage.getItem(tokenKey);
  });

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
