import React, { Suspense, lazy } from "react";
import LayoutClient from "./layout/LayoutClient";
import { useRoutes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Detail = lazy(() => import("./pages/Detail"));
const ProductList = lazy(() => import("./pages/Product/ProductList"));
const Payment = lazy(() => import("./pages/Payment"));
const Cart = lazy(() => import("./pages/Cart"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Product = lazy(() => import("./pages/Product/ProductAdd/AddProduct"));
const OrderList = lazy(() => import("./pages/Order/OrderList/OrderList"));
const OrderDetail = lazy(() => import("./pages/Order/OrderDetail"));
const UserList = lazy(() => import("./pages/User/UserList/UserList"));
const UserUpdate = lazy(() => import("./pages/Admin/Admin"));
const ProductUpdate = lazy(() =>
  import("./pages/Product/ProductUpdate/ProductUpdate")
);

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
      path: "/admin",
      element: (
        <LayoutAdmin>
          <Suspense>
            <Admin />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/admin/products",
      element: (
        <LayoutAdmin>
          <Suspense>
            <ProductList />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/admin/products/add",
      element: (
        <LayoutAdmin>
          <Suspense>
            <Product />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <LayoutAdmin>
          <Suspense>
            <OrderList />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/orders/detail/:id",
      element: (
        <LayoutAdmin>
          <Suspense>
            <OrderDetail />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <LayoutAdmin>
          <Suspense>
            <UserList />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/users/update/:id",
      element: (
        <LayoutAdmin>
          <Suspense>
            <UserUpdate />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
    {
      path: "/products/update/:id",
      element: (
        <LayoutAdmin>
          <Suspense>
            <ProductUpdate />,
          </Suspense>
        </LayoutAdmin>
      ),
    },
  ]);
  return routerElement;
}
