import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setOrder } from "../../../redux/orderSlice";
import { REACT_API_URL } from "../../../utils/http";
import { formatCurrency } from "../../../utils/utils";
import { Space, Table } from "antd";

export default function OrderList() {
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  const getOrder = async () => {
    const res = await axios.get(`${REACT_API_URL}/order/getAll`);
    dispatch(setOrder(res.data));
  };
  useEffect(() => {
    getOrder();
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
      title: "Tên ",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Giá",
      dataIndex: "totalAmount",
      render: (totalAmount) => <p>{formatCurrency(totalAmount)} đ</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          <Link to={`/orders/detail/${record._id}`}>
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
    // <div className="px-5">
    //   <div className="my-5 text-2xl">Danh Sách Đơn Hàng</div>

    //   <table className="w-full mt-5 text-center border border-collapse border-slate-800">
    //     <thead>
    //       <tr className="text-white bg-gray-500">
    //         <th className="p-2 border border-slate-600">Tên</th>
    //         <th className="p-2 border border-slate-600"> Địa chỉ</th>
    //         <th className="p-2 border border-slate-600">SDT</th>
    //         <th className="p-2 border border-slate-600">Email</th>
    //         <th className="p-2 border border-slate-600">Giá</th>
    //         <th className="p-2 border border-slate-600">Thời gian đặt</th>
    //         <th className="p-2 border border-slate-600">Tool</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {order &&
    //         order.map((item) => (
    //           <tr key={item._id} className="border">
    //             <td className="p-2 border border-slate-600">{item.name}</td>
    //             <td className="p-2 border border-slate-600">{item.address}</td>
    //             <td className="p-2 border border-slate-600">{item.phone}</td>
    //             <td className="p-2 border border-slate-600">{item.email}</td>
    //             <td className="p-2 border border-slate-600">
    //               {formatCurrency(item.totalAmount)}
    //             </td>
    //             <td className="p-2 border border-slate-600">
    //               {item.updatedAt}
    //             </td>
    //             <td className="p-2 border border-slate-600">
    //               <div className="flex gap-2 ml-2">
    //                 <Link to={`/orders/detail/${item._id}`}>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth={1.5}
    //                     stroke="currentColor"
    //                     className="w-6 h-6"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    //                     />
    //                   </svg>
    //                 </Link>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //     </tbody>
    //   </table>
    // </div>
    <Table columns={columns} dataSource={order} />
  );
}
