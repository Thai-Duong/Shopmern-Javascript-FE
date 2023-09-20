import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { REACT_API_URL } from "../../utils/http";
import Input from "../Input";
import Textarea from "../Textarea/Textarea";
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
    <div className="w-[350px]">
      <Button
        type="primary"
        size="large"
        onClick={() => setModal1Open(true)}
        className="text-black border border-blue-400 "
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
        width={1000}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          <div className="col-span-1">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Tên sản phẩm :
              </label>
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
              <label htmlFor="price" className="font-bold">
                Giá sản phẩm :
              </label>
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
              <label htmlFor="image" className="font-bold">
                Link hình ảnh :
              </label>
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
            <button
              type="submit"
              className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
            >
              Thêm sản phẩm
            </button>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="font-bold">
                Chi tiết :
              </label>
              <Textarea
                name="description"
                type="text"
                control={control}
                placeholder="Chi tiết sản phẩm"
              ></Textarea>
            </div>
            {errors.description && (
              <p className="text-sm text-red-500">
                Vui lòng điền vào trường này
              </p>
            )}
          </div>
        </form>
      </Modal>
      <br />
      <br />
    </div>
  );
}
