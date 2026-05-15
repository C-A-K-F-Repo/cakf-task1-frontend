import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { RecoveryPage } from "../pages/RecoveryPage"
import { UserPage } from "../pages/UserPage";
import { AdminPanel } from "../pages/AdminPanel";
import { OrderHistory } from "../pages/OrderHistoryPage";
import { NotFoundPage } from "../pages/NotFoundPage";


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
        path:"user",
        element:<UserPage />
      },
      {
        path:"admin",
        element:<AdminPanel />
      },
      {
        path:"history",
        element:<OrderHistory />
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
    path: "*",
    element: <NotFoundPage />
  }
]);
