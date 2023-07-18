import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/auth";
import { REACT_API_URL } from "../../../utils/http";

export default function OrderList() {
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const res = await axios.get(`${REACT_API_URL}/order/getAll`);
    setOrder(res.data);
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="px-5">
      <div className="my-5 text-2xl">Danh Sách Đơn Hàng</div>

      <table className="w-full p-5 text-center table-auto ">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>SDT</th>
            <th>Email</th>
            <th>Giá</th>
            <th>Thời gian đặt</th>
            <th>Tool</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.data.map((item) => (
              <tr key={item._id} className="border">
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{formatCurrency(item.totalAmount)}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <div className="flex gap-2 ml-5">
                    <Link to={`/orders/detail/${item._id}`}>
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
