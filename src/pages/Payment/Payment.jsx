import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_API_URL } from "../../utils/http";
import { calculateDiscount, formatCurrency } from "../../utils/utils";
import { Button, Divider, Table } from "antd";

const paymentSchema = yup
  .object({
    name: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

export default function Payment() {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.profile);
  const selectedItems = cart.filter((item) => item.selected);

  // Tính tổng tiền các sản phẩm được chọn
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const orther = { ...data, cart, totalAmount, user };
    await axios
      .post(`${REACT_API_URL}/order`, orther)
      .then(function (response) {
        toast.success("Mua Hàng Thành Công");
        navigate("/");
      })
      .catch(function (error) {
        toast.success(error);
      });
  };
  const columns = [
    {
      title: "Kiểm tra lại đơn hàng",
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
      render: (text, record) => <div>{record.name}</div>, // Kết hợp tên sản phẩm và giá trong một ô
    },
    {
      title: "", // Tiêu đề cột mới
      key: "productPrice", // Key duy nhất cho cột này
      render: (text, record) => (
        <div className="flex gap-3">
          <div className="font-bold">{record.price.toLocaleString()} đ </div>
          <div className="line-through ">
            {calculateDiscount(record.price, record.price_before_discount)}
          </div>
        </div>
      ), // Kết hợp tên sản phẩm và giá trong một ô
    },

    {
      title: "",
      key: "total",
      render: (_, record) => (
        <div className="text-sm font-bold text-red-700">
          {(record.price * record.cartQuantity).toLocaleString()} đ
        </div>
      ),
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32"
    >
      <div>
        <Table
          dataSource={selectedItems}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />
      </div>
      <div className="px-4 py-2 my-4 bg-gray-50">
        <div className="mb-4 text-xl font-medium">Địa chỉ giao hàng</div>
        <Divider className="my-2" />
        <div>
          <div className="flex gap-3">
            <label className="pt-5 text-sm w-44">Họ Tên Người Nhận</label>
            <Input
              name="name"
              type="text"
              control={control}
              placeholder="Tên của bạn"
            />
          </div>
          <div className="flex gap-3">
            <label className="pt-5 text-sm w-44">
              Số Điện Thoại Người Nhận
            </label>
            <Input
              name="phone"
              type="text"
              control={control}
              placeholder="Số điện thoại"
            />
          </div>
          <div className="flex gap-3">
            <label className="pt-5 text-sm w-44">Địa Chỉ Nhận Hàng</label>
            <Input
              name="address"
              type="text"
              control={control}
              placeholder="Địa chỉ của bạn"
            />
          </div>
          <div className="flex justify-end h-24 gap-6 my-6">
            <div className="flex flex-col h-full gap-2">
              <div className="text-sm font-medium text-gray-900">
                Thành Tiền
              </div>
              <div className="text-sm font-medium text-gray-900">
                Phí vận chuyển (Giao hàng tiêu chuẩn)
              </div>
              <div className="text-lg font-bold text-gray-900">
                Tổng Số Tiền (gồm VAT)
              </div>
            </div>
            <div className="flex flex-col h-full gap-2">
              <div className="text-sm font-semibold text-gray-900">
                {formatCurrency(totalAmount)} ₫
              </div>{" "}
              <div className="text-sm font-semibold text-gray-900">
                {formatCurrency(totalAmount)} ₫
              </div>{" "}
              <div className="text-lg font-bold text-yellow-500">
                {formatCurrency(totalAmount)} ₫
              </div>
            </div>
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-end gap-4 my-3">
          <button
            type="submit"
            className="px-10 py-2 text-xl font-bold text-white transition bg-red-500 rounded-lg hover:bg-red-700"
          >
            Xác Nhận Thanh toán
          </button>
        </div>
      </div>
    </form>
  );
}
