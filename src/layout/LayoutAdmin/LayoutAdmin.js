import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Admin from "../../pages/Admin";
import OrderList from "../../pages/Order";
import ProductList from "../../pages/Product";
import UserList from "../../pages/User";

const { Header, Sider, Content } = Layout;
export default function LayoutAdmin() {
  const userData = useSelector((state) => state.user.profile);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (!userData) return null;
  });
  const renderPage = (key) => {
    switch (key) {
      case "admin":
        return <Admin />;
      case "users":
        return <UserList />;
      case "products":
        return <ProductList />;
      case "orders":
        return <OrderList />;
      default:
        return <></>;
    }
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Dashboard", "admin", <UserOutlined />),
    getItem("Người dùng", "users", <UserOutlined />),
    getItem("Sản phẩm", "products", <AppstoreOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];
  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <Layout className="h-screen p-0 bg-gray-400">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          to="/admin"
          className="flex items-center justify-center my-4 text-2xl text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
          <div className="ml-2">TIKI</div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["user"]}
          items={items}
          onClick={handleOnCLick}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="mr-5">{userData.email}</div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {renderPage(keySelected || "admin")}
        </Content>
      </Layout>
    </Layout>
  );
}
