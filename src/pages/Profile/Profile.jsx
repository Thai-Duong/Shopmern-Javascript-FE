import {
  BellOutlined,
  BookOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Info from "../../components/Profile/Info";
import ProductList from "../../pages/Product";
import Order from "../../components/Profile/Order";
import Reviews from "../../components/Profile/Reviews";
const { Content, Sider } = Layout;

export default function Profile() {
  const userData = useSelector((state) => state.user.profile);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (!userData) return null;
  });
  const renderPage = (key) => {
    switch (key) {
      case "info":
        return <Info userData={userData} />;
      case "order":
        return <Order userData={userData} />;

      case "feedback":
        return <Reviews userData={userData} />;
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
    getItem("Thông tin tài khoản", "info", <UserOutlined />),
    getItem("Đơn hàng của tôi", "order", <BookOutlined />),
    getItem("Nhận xét của tôi", "feedback", <StarOutlined />),
  ];
  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <Layout className="mx-auto mt-5 max-w-7xl rounded-xl bg-[#e6e7eb] gap-3">
      <Sider
        style={{
          background: colorBgContainer,
        }}
        width={300}
      >
        <div className="flex flex-col gap-2 px-8 pt-5 text-center">
          <img src="/icon_rank.webp" alt="" className="w-[90px] mx-auto" />
          <div className="text-xl font-semibold ">{userData.name}</div>
          <div className="w-[120px] bg-gray-300 rounded-xl mx-auto text-sm">
            Thành Viên Bạc
          </div>
          <div className="text-sm text-gray-500">F-Point tích lũy 0</div>
          <div className="text-sm text-gray-500">
            Thêm 30.000 để nâng hạng Vàng
          </div>
          <Divider />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
          onClick={handleOnCLick}
          className="mb-5 rounded-lg"
        />
      </Sider>
      <Content className="min-h-[280px]">
        {renderPage(keySelected || "info")}
      </Content>
    </Layout>
  );
}
