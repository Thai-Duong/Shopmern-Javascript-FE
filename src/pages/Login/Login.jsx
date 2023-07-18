import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../../components/Input";
import { login } from "../../redux/userSlice";
import { REACT_API_URL } from "../../utils/http";

const LoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data) {
      axios
        .post(`${REACT_API_URL}/users/login`, data)
        .then(function (response) {
          if (response.data.status === "ERR") {
            toast.error(response.data.message);
          } else {
            dispatch(login(response.data));
            toast.success("Login success");
            navigate("/");
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:w-[400px] md:mx-auto w-[350px] mx-auto my-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email"
          ></Input>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}

        <div className="flex flex-col gap-3">
          <label htmlFor="password">Mật Khẩu</label>
          <Input
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
          ></Input>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <button
          type="submit"
          className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
        >
          Đăng Nhập
        </button>
        <Link to="/register">Bạn chưa có tài khoản . Đăng ký!</Link>
      </div>
    </form>
  );
}
