import { UndoOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Radio, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { REACT_API_URL } from "../../utils/http";
import Input from "../Input";

const UserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  isAdmin: yup.boolean(),
});

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
      isAdmin: false,
    },
    resolver: yupResolver(UserSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("address", user.address);
      setValue("email", user.email);
      setValue("isAdmin", user.admin); // Nếu user.admin là true thì isAdmin sẽ được chọn là true
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    await axios
      .put(`${REACT_API_URL}/users/update/${id}`, data)
      .then(function (response) {
        toast.success("CHỈNH SỬA TÀI KHOẢN THÀNH CÔNG");
        setModal1Open(false);
      })
      .catch(function (error) {
        toast.error(error.message); // Hiển thị thông báo lỗi chính xác
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
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                type="email"
                control={control}
                placeholder="Email của bạn"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="address">Địa chỉ</label>
              <Input
                name="address"
                type="text"
                control={control}
                placeholder="Địa chỉ của bạn"
              />
            </div>
            {errors.address && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="phone">Số điện thoại</label>
              <Input
                name="phone"
                type="number"
                control={control}
                placeholder="Số điện thoại"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}

            {/* Radio button cho isAdmin */}
            <div className="flex gap-3 mb-3">
              <div className="">Tài khoản Admin</div>
              <div className="flex">
                <Radio.Group
                  name="isAdmin"
                  onChange={(e) => setValue("isAdmin", e.target.value)} // Cập nhật giá trị khi thay đổi
                >
                  <Radio value={true} className="ml-2">
                    True
                  </Radio>
                  <Radio value={false} className="ml-2">
                    False
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            {errors.isAdmin && (
              <p className="text-sm text-red-500">
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
