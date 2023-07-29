import { Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REACT_API_URL } from "../../utils/http";
import { setUser } from "../../redux/userSlice";
import UpdateUser from "../../components/UpdateUser";
import Delete from "../../components/Delete";

export default function UserList() {
  const user = useSelector((state) => state.user.users);
  const navigate = useNavigate();
  const deleteUser = async (id) => {
    await axios.delete(`${REACT_API_URL}/users/delete/${id}`);
    toast.success("Xóa Tài Khoản Thành Công");
    navigate("/admin");
  };
  const dispatch = useDispatch();

  const getUser = async () => {
    const res = await axios.get(`${REACT_API_URL}/users/getAll`);
    dispatch(setUser(res.data));
  };

  useEffect(() => {
    getUser();
  }, []);
  const columns = [
    {
      title: "STT",
      accessor: "index",
      width: 50,
      fixed: "left",
      render: (text, object, index) => index + 1,
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

  return <Table columns={columns} dataSource={user} />;
}
