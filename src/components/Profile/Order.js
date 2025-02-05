import { Card, Input, List, Tabs, Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/orderSlice";
import { REACT_API_URL } from "../../utils/http";
import { formatCurrency } from "../../utils/utils";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Order = ({ userData }) => {
  const orders = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  const getUserOrders = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_API_URL}/order/user/${userId}`);
      dispatch(setOrder(response.data)); // Chỉ truyền mảng orders vào Redux
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (userData._id) {
      dispatch(getUserOrders(userData._id));
    }
  }, [dispatch, userData._id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Title level={2}>Đơn hàng của tôi</Title>

      {/* <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả đơn" key="1" />
        <TabPane tab="Chờ thanh toán" key="2" />
        <TabPane tab="Đang xử lý" key="3" />
        <TabPane tab="Đang vận chuyển" key="4" />
        <TabPane tab="Đã giao" key="5" />
        <TabPane tab="Đã hủy" key="6" />
      </Tabs> */}

      {/* <Input.Search
        placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
        enterButton="Tìm đơn hàng"
        className="my-4"
      /> */}

      <List
        itemLayout="vertical"
        dataSource={orders}
        renderItem={(order) => (
          <Card style={{ marginBottom: "20px" }}>
            <Title level={4}>Mã đơn hàng: {order._id}</Title>
            {/* <Text strong>Trạng thái: </Text> */}
            <Text>{order.status}</Text>
            <br />
            <Text strong>Tổng tiền: </Text>
            <Text style={{ color: "orange", fontSize: "18px" }}>
              {formatCurrency(order.totalAmount)} đ
            </Text>
            <List
              dataSource={order.cart}
              renderItem={(item) => (
                <List.Item>
                  <img src={item.image} alt="photo1" className="w-20 border" />
                  <div className="flex justify-start">
                    <Text>{item.name}</Text> -{" "}
                    <Text>{item.price.toLocaleString()} đ</Text> (x
                    {item.quantity})
                  </div>
                </List.Item>
              )}
            />
            {/* <Button type="primary" style={{ marginRight: "10px" }}>
              Mua lại
            </Button>
            <Button>Xem chi tiết</Button> */}
          </Card>
        )}
      />
    </div>
  );
};

export default Order;
