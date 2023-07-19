import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../../../components/Input";
import { REACT_API_URL } from "../../../utils/http";

const UserSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    isAdmin: yup.boolean(),
  })
  .required();

export default function UserUpdate() {
  const { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const user = users.filter((el) => el._id === id)[0];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
    resolver: yupResolver(UserSchema),
  });
  const naviagte = useNavigate();
  useEffect(() => {
    if (user) {
      setValue("address", user.address);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("email", user.email);
    }
  }, [user, setValue]);
  const onSubmit = (data) => {
    axios
      .put(`${REACT_API_URL}/users/update/${id}`, data)
      .then(function (response) {
        toast.success("CHỈNH SỬA SẢN PHẨM THÀNH CÔNG");
        naviagte("/admin/user");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 text-2xl">Chỉnh sửa tài khoản</div>

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

        <div className="flex gap-3 mb-3">
          <div className="flex">
            <Input name="isAdmin" type="checkbox" control={control} />
            <label htmlFor="isAdmin" className="ml-2 ">
              Admin
            </label>
          </div>
        </div>
        {errors.isAdmin && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <button
          type="submit"
          className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
        >
          Cập Nhật
        </button>
      </div>
    </form>
  );
}
