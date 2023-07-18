import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_API_URL } from "../../utils/http";

const RegisterSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    comfirm_password: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${REACT_API_URL}/users/register`, data)
      .then(function (response) {
        if (response.data.status == "ERR") {
          toast.error(response.data.message);
        }
        toast.success("Register success");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:w-[400px] md:mx-auto w-[350px] mx-auto my-5">
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
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
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
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <div className="flex flex-col gap-3">
          <label htmlFor="adress">Adress</label>
          <Input
            name="address"
            type="text"
            control={control}
            placeholder="Địa chỉ của bạn"
          ></Input>
        </div>
        {errors.address && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <div className="flex flex-col gap-3">
          <label htmlFor="phone">Phone</label>
          <Input
            name="phone"
            type="number"
            control={control}
            placeholder="Số điện thoại"
          ></Input>
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Mật khẩu</label>
          <Input
            name="password"
            type="text"
            control={control}
            placeholder="Enter your password"
          ></Input>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Xác Nhận Mật Khẩu</label>
          <Input
            name="comfirm_password"
            type="text"
            control={control}
            placeholder="Enter your comfirm password"
          ></Input>
        </div>
        {errors.confirm_password && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}

        <button
          type="submit"
          className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
        >
          Đăng Ký
        </button>
      </div>
    </form>
  );
}
