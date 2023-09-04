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
import Textarea from "../Textarea";

const ProductSchema = yup
  .object({
    name: yup.string().required(),
    price: yup.string().required(),
    image: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function UpdateProduct({ id }) {
  const [modal1Open, setModal1Open] = useState(false);
  const products = useSelector((state) => state.product.products);
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
      .put(`${REACT_API_URL}/products/update/${id}`, data)
      .then(function (response) {
        console.log(response);
        toast.success("CHỈNH SỬA SẢN PHẨM THÀNH CÔNG");
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
        title="Chỉnh sửa sản phẩm"
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
              <Textarea
                name="description"
                type="text"
                control={control}
                placeholder="Chi tiết sản phẩm"
              ></Textarea>
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
