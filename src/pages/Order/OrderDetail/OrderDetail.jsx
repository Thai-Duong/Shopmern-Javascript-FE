import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/auth";
import { REACT_API_URL } from "../../../utils/http";

export default function OrderDetail() {
  const [order, setOrderDetail] = useState();
  const { id } = useParams();
  const getOrderDetail = async () => {
    const res = await axios.get(`${REACT_API_URL}/order/detail/${id}`);
    setOrderDetail(res.data.data);
  };
  useEffect(() => {
    getOrderDetail();
  }, []);
  if (!order) return null;
  return (
    <div>
      <div className="px-5">
        <div className="my-5 text-2xl">Danh Sách Sản Phẩm Trong Đơn Hàng</div>
        <table className="w-full p-5 text-center table-auto ">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.cart.map((item) => (
                <tr key={item._id} className="border">
                  <td>
                    <div className="w-20 h-20">
                      <img src={item.image} alt="" />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.price)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
