import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutClient from "./layout/LayoutClient";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Detail = lazy(() => import("./pages/Detail"));
const Payment = lazy(() => import("./pages/Payment"));
const Cart = lazy(() => import("./pages/Cart"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Profile = lazy(() => import("./pages/Profile"));

export default function useRouteElement() {
  // eslint-disable-next-line no-sparse-arrays
  const routerElement = useRoutes([
    {
      path: "/",
      index: true,
      element: (
        <LayoutClient>
          <Suspense>
            <Home />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/cart",
      element: (
        <LayoutClient>
          <Suspense>
            <Cart />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/register",
      element: (
        <LayoutClient>
          <Suspense>
            <Register />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/login",
      element: (
        <LayoutClient>
          <Suspense>
            <Login />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <LayoutClient>
          <Suspense>
            <Detail />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/payment",
      element: (
        <LayoutClient>
          <Suspense>
            <Payment />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/profile",
      element: (
        <LayoutClient>
          <Suspense>
            <Profile />,
          </Suspense>
        </LayoutClient>
      ),
    },
    {
      path: "/admin",
      element: (
        <LayoutAdmin>
          <Suspense>
            <Admin />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
  ]);
  return routerElement;
}
