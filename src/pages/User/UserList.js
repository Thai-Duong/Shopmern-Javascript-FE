import { Space, Table } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../../components/Delete";
import UpdateUser from "../../components/UpdateUser";
import { setUser } from "../../redux/userSlice";
import { REACT_API_URL } from "../../utils/http";

export default function UserList() {
  const users = useSelector((state) => state.user.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteUser = async (id) => {
    await axios.delete(`${REACT_API_URL}/users/delete/${id}`);
    toast.success("Xóa Tài Khoản Thành Công");
    navigate("/admin");
  };

  const getUser = async () => {
    const res = await axios.get(`${REACT_API_URL}/users/getAll`);
    dispatch(setUser(res.data));
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 50,
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tài Khoản",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => <p>{isAdmin ? "Admin" : "User"}</p>, // Hiển thị Admin/User
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Delete onOk={() => deleteUser(record._id)} />
          <UpdateUser id={record._id} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="_id" // Đảm bảo mỗi dòng có key duy nhất
    />
  );
}
