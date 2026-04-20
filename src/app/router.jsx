import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { RecoveryPage } from "../pages/RecoveryPage"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      { 
        path: "login", 
        element: <LoginPage /> 
      },    
      { 
        path: "recovery", 
        element: <RecoveryPage /> 
      }
    ]
  }
]);
