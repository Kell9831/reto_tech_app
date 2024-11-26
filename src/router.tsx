import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { authProvider } from "./auth";
import App from "./components/App/App";


export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    async action() {
      await authProvider.logout();
      return redirect("/login");
    },
  },
  {
    path: "/register",
    element: <Register />,
  },

]);