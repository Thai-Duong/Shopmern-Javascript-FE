import React from "react";
import { Link } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <div className="flex h-full ">
      <div className="p-4 rounded-lg">
        <Link to="" className="flex items-center font-bold ">
          Danh Mục Quản Lý
        </Link>
        <div className="my-4 h-[1px] bg-gray-300"></div>
        <ul>
          <li className="py-5 pl-2">
            <Link to={"/admin/users"}>Quản lý Người Dùng</Link>
          </li>
          <li className="py-5 pl-2">
            <Link to={"/admin/products"}>Quản lý Sản Phẩm </Link>
          </li>
          <li className="py-5 pl-2">
            <Link to={"/admin/orders"}>Quản Lý Đơn Hàng </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
