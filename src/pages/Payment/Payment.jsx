import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/auth";

const paymentSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

export default function Payment() {
  const { cart, totalAmount, cartQuantity } = useSelector(
    (state) => state.cart
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
    const orther = { ...data, cart, totalAmount };
    await axios
      .post("http://localhost:8080/order", orther)
      .then(function (response) {
        toast.success("Mua Hàng Thành Công");
        navigate("/");
      })
      .catch(function (error) {
        toast.success(error);
      });
  };

  return (
    <div className="px-[100px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32"
      >
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Thông Tin Sản Phẩm</p>
          <div className="px-2 py-4 mt-8 space-y-3 bg-white border rounded-lg sm:px-6">
            {cart.length > 0 &&
              cart.map((item) => (
                <div className="flex flex-col bg-white rounded-lg sm:flex-row">
                  <img
                    className="object-cover object-center h-24 m-2 border rounded-md w-28"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex flex-col w-full px-4 py-4">
                    <span className="font-semibold">{item.name}</span>
                    <span className="float-right text-gray-400">
                      Số lượng : {item.cartQuantity}
                    </span>
                    <p className="text-lg font-bold">
                      Giá : {formatCurrency(item.price * item.cartQuantity)} ₫
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="px-4 pt-8 mt-10 bg-gray-50 lg:mt-0">
          <p className="mb-4 text-xl font-medium">Thông Tin Thanh Toán</p>
          <div className="">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Họ Tên</label>
              <Input
                name="name"
                type="text"
                control={control}
                placeholder="Tên của bạn"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Email</label>
              <Input
                name="email"
                type="email"
                control={control}
                placeholder="Email của bạn"
              ></Input>
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="adress">Địa Chỉ</label>
              <Input
                name="address"
                type="text"
                control={control}
                placeholder="Địa chỉ của bạn"
              ></Input>
            </div>
            {errors.adress && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="phone">Phone</label>
              <Input
                name="phone"
                type="text"
                control={control}
                placeholder="Số điện thoại"
              ></Input>
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm font-medium text-gray-900">Tổng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(totalAmount)} ₫
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 mb-8 font-medium text-white bg-gray-900 rounded-md"
          >
            Mua Hàng
          </button>
        </div>
      </form>
    </div>
  );
}
