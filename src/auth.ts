import { URL_BASE, tokenKey } from "./constants";
import { AuthResponse, UserCredentials } from "./types/index";

const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
  isAuthenticated: savedToken !== null,
  token: savedToken,

  async login(credentials: UserCredentials): Promise<void> {
    const url = `${URL_BASE}/auth/login`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(credentials), 
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const body: AuthResponse = await response.json(); 
      this.isAuthenticated = true;
      this.token = body.access_token;
      window.localStorage.setItem(tokenKey, body.access_token);
    } else {
      const error = await response.json();
      throw new Error(error.message || "Error during login");
    }
  },

  async logout(): Promise<void> {
    window.localStorage.removeItem(tokenKey);
    this.isAuthenticated = false;
    this.token = null;
  },

  async createUser(credentials: UserCredentials): Promise<void> {
    const url = `${URL_BASE}/auth/register`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(credentials), 
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const body: AuthResponse = await response.json(); 
      this.isAuthenticated = true;
      this.token = body.access_token;
      window.localStorage.setItem(tokenKey, body.access_token);
    } else {
      const error = await response.json();
      throw new Error(error.message || "Error creating user");
    }
  },
};
