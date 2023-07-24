import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REACT_API_URL } from "../../../utils/http";
import { Button, Space, Table, Modal } from "antd";
import { formatCurrency } from "../../../utils/utils";
import DeleteOutlined from "@ant-design/icons";
import RestTwoTone from "@ant-design/icons";
export default function ProductList() {
  const product = useSelector((state) => state.product.productList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getProduct = async (data) => {
    const res = await axios.get(`${REACT_API_URL}/products/getAll`, data);
    dispatch(setProduct(res.data));
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${REACT_API_URL}/products/delete/${id}`);
    toast.success("Xóa sản phẩm Thành Công");
    navigate("/admin");
  };
  useEffect(() => {
    getProduct();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      accessor: "index",
      width: 50,
      fixed: "left",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      render: (image) => <img src={image} alt={image} />,
      width: 150,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>{formatCurrency(price)} đ</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={showModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <Modal
            title="Cảnh Báo"
            open={isModalOpen}
            onOk={() => deleteProduct(record._id)}
            onCancel={handleCancel}
          >
            <p> Bạn có muốn xóa sản phẩm này không</p>
          </Modal>

          <Link to={`/products/update/${record._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button
        onClick={() => navigate("/admin/products/add")}
        size={"large"}
        className="mb-3"
      >
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={product} />
    </>
  );
}
