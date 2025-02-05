import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  Card,
  Space,
  Statistic,
  Table,
  Select,
  DatePicker,
  Button,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { setOrder } from "../../redux/orderSlice";
import { setProduct } from "../../redux/productSlice";
import { REACT_API_URL } from "../../utils/http";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  const product = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, productRes] = await Promise.all([
          axios.get(`${REACT_API_URL}/order/getAll`),
          axios.get(`${REACT_API_URL}/products/getAll`),
        ]);
        dispatch(setOrder(orderRes.data));
        dispatch(setProduct(productRes.data));
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu, vui lòng thử lại!");
      }
    };
    fetchData();
  }, [dispatch]);

  const totalRevenue = order
    ?.reduce((sum, o) => {
      return sum + (Number(o.totalAmount) || 0);
    }, 0)
    .toFixed(2);
  const getOrdersByMonth = () => {
    const ordersByMonth = {};

    order.forEach((o) => {
      const month = o.createdAt.slice(0, 7); // Lấy năm-tháng (YYYY-MM)
      if (!ordersByMonth[month]) {
        ordersByMonth[month] = 0;
      }
      ordersByMonth[month] += 1; // Đếm số đơn trong tháng
    });

    return {
      labels: Object.keys(ordersByMonth), // Danh sách tháng
      datasets: [
        {
          label: "Số đơn hàng",
          data: Object.values(ordersByMonth), // Số đơn mỗi tháng
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    };
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Space>
        <Card>
          <Statistic
            title="Tổng Đơn Hàng"
            value={order.length}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Sản Phẩm"
            value={product.length}
            prefix={<ShoppingOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Doanh Thu"
            value={totalRevenue}
            prefix={<DollarOutlined />}
          />
        </Card>
      </Space>

      <h3>Biểu đồ đơn hàng theo tháng</h3>
      <div style={{ height: "400px" }}>
        <Bar
          data={getOrdersByMonth()}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
