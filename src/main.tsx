import ReactDOM from "react-dom/client";
import  "./index.css";
import { router } from "./router";
import {RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
     <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  //</React.StrictMode>,
)
