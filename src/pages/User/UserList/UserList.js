import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const user = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    const res = await axios.get("http://localhost:8080/users/getAll");
    dispatch(setUser(res.data));
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/users/delete/${id}`);
    toast.success("Xóa Tài Khoản Thành Công");
    navigate("/admin");
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;

  return (
    <div className="px-5">
      <div className="my-5 text-2xl">Danh Sách Tài Khoản Người Dùng</div>

      <table className="w-full p-5 text-center table-auto ">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày Tạo</th>
            <th>Địa Chỉ</th>
            <th>SDT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.map((item) => (
              <tr key={item._id} className="border ">
                <td>{item.name}</td>
                <td className="px-3">{item.email}</td>
                <td>{item.createdAt}</td>
                <td>{item.createdAt}</td>
                <td>{item.createdAt}</td>
                <td>
                  <div className="flex gap-2 ml-5">
                    <Link onClick={() => deleteUser(item._id)}>
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Link>
                    <Link to={`/users/update/${item._id}`}>
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
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
