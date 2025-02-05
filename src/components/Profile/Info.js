import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setOrder } from "../../redux/orderSlice";
import { REACT_API_URL } from "../../utils/http";
import Input from "../Input";
import { formatCurrency } from "../../utils/utils";

// Validation schema for the form
const UserSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  isAdmin: yup.boolean(),
});

export default function Info({ userData }) {
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize form
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      isAdmin: "",
    },
    resolver: yupResolver(UserSchema),
  });

  // Fetch user orders (optional if needed)
  const getOrder = async () => {
    try {
      const res = await axios.get(`${REACT_API_URL}/order/getAll`);
      dispatch(setOrder(res.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Set form default values when userData changes
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("address", userData.address);
      setValue("phone", userData.phone);
      setValue("isAdmin", userData.admin);
    }
  }, [userData, setValue]);

  // Fetch orders on initial render
  useEffect(() => {
    getOrder();
  }, [dispatch]);

  // Hàm tính số lượng đơn hàng
  const getUserOrderCount = (userId) => {
    if (!order || order.length === 0) return 0; // Kiểm tra dữ liệu trước khi xử lý
    return order.filter((o) => o.user === userId).length; // So sánh ID người dùng
  };
  const getTotalAmountByUser = (userId) => {
    // Lọc các đơn hàng của user
    const userOrders = order.filter((order) => order.user === userId);

    // Tính tổng số tiền
    const totalAmount = userOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    return totalAmount;
  };
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await axios.put(`${REACT_API_URL}/users/update/${userData._id}`, data);
      navigate("/login");
      message.success("Cập nhật thông tin thành công! Vui lòng đăng nhập lại");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg max-w-7xl">
        <img src="/background_silver.webp" alt="backgrounnd"></img>
        <div className="flex gap-2 p-2 my-2">
          <div className="w-full p-2 bg-white rounded-lg shadow-xl">
            <div className="py-2 text-xl">Ưu đãi của bạn</div>
            <div className="flex gap-3">
              <div className="w-full p-3 bg-gray-100 rounded-lg">
                <div className="text-xl">F-Point hiện có</div>
                <div className="text-xl">0</div>
              </div>{" "}
              <div className="w-full p-3 bg-gray-100 rounded-lg">
                <div className="text-xl">F-Point hiện có</div>
                <div className="text-xl">0</div>{" "}
              </div>
            </div>
          </div>
          <div className="w-full p-2 bg-white rounded-lg shadow-xl">
            <div className="py-2 text-xl">Thành tích năm 2025</div>

            <div className="flex gap-3">
              <div className="w-full p-3 bg-gray-100 rounded-lg">
                <div className="text-xl">Số đơn hàng</div>
                <div className="text-xl">
                  {" "}
                  {getUserOrderCount(userData._id)} đơn hàng
                </div>
              </div>{" "}
              <div className="w-full p-3 bg-gray-100 rounded-lg">
                <div className="text-xl">Đã thanh toán</div>
                <div className="text-xl">
                  {getTotalAmountByUser(userData._id)} đ
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 mx-auto bg-white rounded-lg max-w-7xl">
        <h2 className="mb-5 text-2xl font-bold">Cập nhật thông tin cá nhân</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mb-5">
            <label className="mt-4 w-44">Họ tên</label>
            <Input control={control} name="name" placeholder="Nhập họ tên" />
          </div>
          <div className="flex mb-5">
            <label className="mt-4 w-44">Email</label>
            <Input
              control={control}
              name="email"
              placeholder="Nhập email"
              disabled
            />
          </div>
          <div className="flex mb-5">
            <label className="mt-4 w-44">Số điện thoại</label>
            <Input
              control={control}
              name="phone"
              placeholder="Nhập số điện thoại"
              type="text"
            />
          </div>
          <div className="flex mb-5">
            <label className="mt-4 w-44">Địa chỉ</label>
            <Input
              control={control}
              name="address"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <button
            type="submit"
            className="flex py-2 mx-auto text-white bg-red-500 rounded px-14 "
          >
            Lưu Thay Đổi
          </button>
        </form>
      </div>
    </div>
  );
}
