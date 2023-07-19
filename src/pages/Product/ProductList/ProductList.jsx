import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REACT_API_URL } from "../../../utils/http";

export default function ProductList() {
  const product = useSelector((state) => state.product.productList);
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
  return (
    <div className="m-5">
      <div className="my-5 text-2xl">Danh Sách Sản Phẩm</div>
      <Link
        className="px-4 py-2 mb-3 text-xl border align-center"
        to={"/admin/products/add"}
      >
        Thêm Sản Phẩm
      </Link>
      <table className="w-full mt-5 text-center border border-collapse border-slate-800">
        <thead>
          <tr className="text-white bg-gray-500">
            <th className="p-2 border border-slate-600">Ảnh</th>
            <th className="p-2 border border-slate-600">Tên</th>
            <th className="p-2 border border-slate-600">Giá</th>
            <th className="p-2 border border-slate-600">Tool</th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product.map((item) => (
              <tr key={item._id} className="border ">
                <td className="p-0 border border-slate-600">
                  <img
                    className="block w-full h-[100px]"
                    src={item.image}
                    alt=""
                  />
                </td>
                <td className="p-2 border border-slate-600">{item.name}</td>
                <td className="p-2 border border-slate-600">{item.price}</td>
                <td className="p-2 border border-slate-600">
                  <div className="flex gap-2 ml-4">
                    <Link onClick={() => deleteProduct(item._id)}>
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

                    <Link to={`/products/update/${item._id}`}>
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
