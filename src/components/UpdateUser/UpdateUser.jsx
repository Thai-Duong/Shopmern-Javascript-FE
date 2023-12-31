import { UndoOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { REACT_API_URL } from "../../utils/http";
import Input from "../Input";

const UserSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    isAdmin: yup.boolean(),
  })
  .required();

export default function UpdateUser({ id }) {
  const [modal1Open, setModal1Open] = useState(false);

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
  useEffect(() => {
    if (user) {
      setValue("address", user.address);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("email", user.email);
    }
  }, [user, setValue]);
  const onSubmit = async (data) => {
    await axios
      .put(`${REACT_API_URL}/users/update/${id}`, data)
      .then(function (response) {
        console.log(response);
        toast.success("CHỈNH SỬA TÀI KHOẢN THÀNH CÔNG");
        setModal1Open(false);
      })
      .catch(function (error) {
        toast.success(error);
      });
  };
  return (
    <>
      <Space size="middle">
        <UndoOutlined
          onClick={() => setModal1Open(true)}
          className="mt-6 text-2xl"
        />
      </Space>
      <Modal
        title="Chỉnh sửa tài khoản"
        style={{
          top: 20,
          color: "black",
        }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
      >
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
              <p className="text-sm text-red-500">
                {" "}
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
                {" "}
                Vui lòng điền vào trường này
              </p>
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
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
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
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
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
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <button
              type="submit"
              className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </Modal>
      <br />
      <br />
    </>
  );
}
