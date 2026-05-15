import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { RecoveryPage } from "../pages/RecoveryPage";
import { VerifyEmailPage } from "../pages/VerifyEmailPage";
import { NotFoundPage } from "../pages/NotFoundPage";


export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <HomePage />
          }
        ]
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/recovery",
    element: <RecoveryPage />
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
