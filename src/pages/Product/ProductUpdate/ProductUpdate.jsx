import React, { useEffect } from "react";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductSchema = yup
  .object({
    name: yup.string().required(),
    price: yup.string().required(),
    image: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function ProductUpdate() {
  const { id } = useParams();
  const products = useSelector((state) => state.product.productList);
  const product = products.filter((el) => el._id === id)[0];
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(ProductSchema),
  });
  const naviagte = useNavigate();
  useEffect(() => {
    if (product) {
      setValue("description", product.description);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("image", product.image);
    }
  }, [product, setValue]);
  const onSubmit = async (data) => {
    await axios
      .put(`http://localhost:8080/products/update/${id}`, data)
      .then(function (response) {
        console.log(response);
        toast.success("CHỈNH SỬA SẢN PHẨM THÀNH CÔNG");
        naviagte("/admin/product");
      })
      .catch(function (error) {
        toast.success(error);
      });
  };

  return (
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
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
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
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}
        <div className="flex flex-col gap-3">
          <label htmlFor="image">Hình ảnh</label>
          <Input name="image" control={control} placeholder="Hình ảnh"></Input>
        </div>
        {errors.image && (
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
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
          <p className="text-sm text-red-500"> Vui lòng điền vào trường này</p>
        )}

        <button
          type="submit"
          className="h-[50px] w-full bg-blue-600 rounded-lg text-white"
        >
          Thêm sản phẩm
        </button>
      </div>
    </form>
  );
}
