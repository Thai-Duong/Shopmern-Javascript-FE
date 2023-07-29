import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { REACT_API_URL } from "../../utils/http";
import Input from "../Input";

const ProductSchema = yup
  .object({
    name: yup.string().required(),
    price: yup.string().required(),
    image: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
export default function AddProduct() {
  const [modal1Open, setModal1Open] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const onSubmit = (data) => {
    axios
      .post(`${REACT_API_URL}/products/create`, data)
      .then(function () {
        toast.success("Create product success");
        setModal1Open(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={() => setModal1Open(true)}
        className="text-black border border-blue-400"
      >
        Thêm sản phẩm
      </Button>
      <Modal
        title="Thêm sản phẩm"
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
          <div className="md:w-[400px] md:mx-auto w-[350px] mx-auto my-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Tên sản phẩm</label>
              <Input
                name="name"
                type="text"
                control={control}
                placeholder="Tên sản phẩm"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="price">Giá sản phẩm</label>
              <Input
                name="price"
                control={control}
                placeholder="Giá sản phẩm"
              ></Input>
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="image">Hình ảnh</label>
              <Input
                name="image"
                control={control}
                placeholder="Hình ảnh"
              ></Input>
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}

            <div className="flex flex-col gap-3">
              <label htmlFor="description">Chi tiết</label>
              <Input
                name="description"
                type="text"
                control={control}
                placeholder="Chi tiết sản phẩm"
              ></Input>
            </div>
            {errors.description && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}

            <button
              type="submit"
              className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </Modal>
      <br />
      <br />
    </>
  );
}
