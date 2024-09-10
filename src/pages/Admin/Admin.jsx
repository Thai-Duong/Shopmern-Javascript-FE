import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/orderSlice";
import { setProduct } from "../../redux/productSlice";
import { setUser } from "../../redux/userSlice";
import { REACT_API_URL } from "../../utils/http";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Admin() {
  const order = useSelector((state) => state.order.order);
  const user = useSelector((state) => state.user.users);
  const product = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const getOrder = async () => {
    const res = await axios.get(`${REACT_API_URL}/order/getAll`);
    dispatch(setOrder(res.data));
  };
  const getUser = async () => {
    const res = await axios.get(`${REACT_API_URL}/users/getAll`);
    dispatch(setUser(res.data));
  };
  const getProduct = async (data) => {
    const res = await axios.get(`${REACT_API_URL}/products/getAll`, data);
    dispatch(setProduct(res.data));
  };
  useEffect(() => {
    getOrder();
    getUser();
    getProduct();
  }, []);
  return (
    <div className="">
      <div className="">Dashboard</div>
      <Space>
        <Card>
          <Space direction="horizontal">
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Đơn Hàng" value={order.length} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <ShoppingOutlined
              style={{
                color: "black",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Sản Phẩm" value={product.length} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Tài Khoản" value={user.length} />
          </Space>
        </Card>
      </Space>
    </div>
  );
}
