import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Register = () => {
  const { signup  } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setError("");
      await signup ({ username, password });
      navigate("/login"); // Redirige al usuario al login después de registrarse
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al registrarse.");
      } else {
        setError("Error desconocido.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700">Register</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su contraseña"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-sky-200 focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-sky-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
