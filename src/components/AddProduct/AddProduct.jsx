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
    type: yup.string().required(),
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
    console.log("data", data);
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
              <label htmlFor="name" className="font-bold">
                Tên Tác Giả :
              </label>
              <Input
                name="author"
                type="text"
                control={control}
                placeholder="Tên tác giả"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Tên Nhà Cung Cấp :
              </label>
              <Input
                name="supplier"
                type="text"
                control={control}
                placeholder="Tên Nhà Cung Cấp"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Tên Nhà Xuất Bản :
              </label>
              <Input
                name="publisher"
                type="text"
                control={control}
                placeholder="Tên nhà xuất bản"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Số Trang :
              </label>
              <Input
                name="page"
                type="number"
                control={control}
                placeholder="Số Trang"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Ngôn ngữ :
              </label>
              <Input
                name="language"
                type="text"
                control={control}
                placeholder="Ngôn ngữ"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">
                Năm xuất bản :
              </label>
              <Input
                name="yearPublish"
                type="text"
                control={control}
                placeholder="Năm xuất bản"
              ></Input>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="col-span-1">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="font-bold">
                  Tên thể loại :
                </label>
                <Input
                  name="type"
                  type="text"
                  control={control}
                  placeholder="Tên thể loại"
                ></Input>
              </div>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {" "}
                Vui lòng điền vào trường này
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label htmlFor="price_before_discount" className="font-bold">
                Giá sản phẩm trước khuyến mãi :
              </label>
              <Input
                name="price_before_discount"
                control={control}
                placeholder="Giá sản phẩm truoc khuyen mai"
              ></Input>
            </div>
            {errors.price_before_discount && (
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
