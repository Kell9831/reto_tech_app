import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import App from "./components/App/App";
import ProtectedRoute from "./ProtectedRoute";


export const router = createBrowserRouter([
  {
    id: "protected",
    element: <ProtectedRoute />, 
    children: [
      {
        id: "app",
        path: "/",
        element: <App />,
      },
      {
        path: "/logout",
        async action() {
          return redirect("/login");
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />,
  },

]);