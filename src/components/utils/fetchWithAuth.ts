import { tokenKey, URL_BASE } from "../../constants";

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = window.localStorage.getItem(tokenKey);
  if (!token) throw new Error("No se encontró un token de autenticación");

  const url = endpoint.startsWith("http") ? endpoint : `${URL_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {

      let errorMessage = "Error en la solicitud";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        throw new Error(errorMessage);
      }
      
    }

    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      throw new Error("Error de red: no se pudo conectar al servidor");
    }
    throw error;
  }
}
