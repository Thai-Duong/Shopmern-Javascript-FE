import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Space, Table } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  delToCart,
  descreaseCart,
  increaseCart,
  toggleSelect,
} from "../../redux/cartSlice";
import { calculateDiscount, formatCurrency } from "../../utils/utils";
export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispacth = useDispatch();
  const hanldeDelToCart = (item) => {
    dispacth(delToCart(item));
  };
  const hanldePlusCart = (item) => {
    dispacth(increaseCart(item));
  };
  const hanldeMinusCart = (item) => {
    dispacth(descreaseCart(item));
  };
  const handleSelect = (_id, checked) => {
    dispacth(toggleSelect({ _id, selected: checked }));
  };
  const columns = [
    {
      title: "",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={record.selected || false}
          onChange={(e) => handleSelect(record._id, e.target.checked)}
        />
      ),
    },
    {
      title: "",
      key: "",
      render: (_, record) => (
        <img
          src={record.image}
          alt="ikkmkage"
          className="object-contain h-32"
        />
      ),
    },
    {
      title: "", // Tiêu đề cột mới
      key: "productPrice", // Key duy nhất cho cột này
      render: (text, record) => (
        <div className="flex flex-col justify-between w-48 h-32">
          <div>{record.name}</div>
          <div className="flex gap-3">
            <div className="font-bold">{record.price.toLocaleString()} đ </div>
            <div className="line-through ">
              {calculateDiscount(record.price, record.price_before_discount)}
            </div>
          </div>
        </div>
      ), // Kết hợp tên sản phẩm và giá trong một ô
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Space className="text-lg border rounded-sm">
          <Button
            type="text"
            size="small"
            onClick={() => hanldeMinusCart(record)}
          >
            -
          </Button>
          <div className="text-black">{record.cartQuantity}</div>
          <Button
            type="text"
            size="small"
            onClick={() => hanldePlusCart(record)}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) => (
        <div className="text-sm font-bold text-red-700">
          {(record.price * record.cartQuantity).toLocaleString()} đ
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <DeleteOutlined
          className="text-xl"
          onClick={() => hanldeDelToCart(record)}
        />
      ),
    },
  ];

  // Tính tổng tiền các sản phẩm đã chọn
  const totalAmount = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  return (
    <div className="grid grid-cols-3 gap-4 px-4 mx-auto mt-10 max-w-7xl">
      <div className="col-span-2">
        <Title level={2}>Giỏ hàng</Title>
        <Table
          dataSource={cart}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />
      </div>

      <div className="col-span-1 p-3 bg-white rounded-lg h-[180px]">
        <div className="flex justify-between">
          <div className="text-sm xl:text-lg">Thành Tiền:</div>
          <div className="text-sm xl:text-lg">
            {formatCurrency(totalAmount)}
          </div>
        </div>
        <Divider className="my-5" />
        <div className="flex justify-between font-bold text-red-600">
          <div className="text-sm xl:text-xl">Tổng Số Tiền (gồm VAT):</div>
          <div className="text-sm xl:text-2xl">
            {formatCurrency(totalAmount)}
          </div>
        </div>

        <div className="py-2 mt-4 text-xl font-bold text-center text-white bg-red-600 rounded-lg">
          <Link type="primary" danger to="/payment">
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}
