import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Task1DomainPage } from "../pages/Task1DomainPage";
import { Task1UsersPage } from "../pages/Task1UsersPage";

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
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "task1/users",
        element: <Task1UsersPage />
      },
      {
        path: "task1/domain",
        element: <Task1DomainPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
