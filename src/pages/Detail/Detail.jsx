import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { formatCurrency, getIdFormNameId } from "../../utils/utils";

export default function Detail() {
  const { id } = useParams();
  const nameId = getIdFormNameId(id);
  console.log(id);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.profile);
  const product = products.filter((el) => el._id === nameId)[0];
  const hanldeAddToCart = (item) => {
    if (user) {
      dispatch(addToCart(item));
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      navigator("/login");
    }
  };
  if (!product) return null;
  return (
    <div className="px-4 mx-auto mt-5 max-w-7xl">
      <div className="grid grid-cols-12 bg-white shadow lg:gap-9 lg:p-4">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative w-full cursor-zoom-in overflow-hidden pt-[100%]">
            <img
              className="absolute top-0 left-0 object-cover w-full h-full bg-white pointer-events-none"
              src={product.image}
              alt=""
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="mt-3 text-xl font-medium uppercase">
            {product.name}
          </div>
          <div className="flex items-center px-5 py-4 mt-8 bg-gray-50">
            <div className="w-full mr-3 text-2xl font-bold text-red-500 lg:text-4xl">
              {formatCurrency(product.price)}₫
            </div>
          </div>
          <div className="flex items-center mt-5"></div>
          <button
            onClick={() => hanldeAddToCart(product)}
            className="flex items-center justify-center w-full h-12 px-10 text-white capitalize bg-red-600 border rounded-lg lg:w-[200px] hover:bg-red-300"
          >
            CHỌN MUA
          </button>
        </div>
      </div>
      <div className="p-4 mt-5 text-lg capitalize rounded bg-gray-50 text-slate-700">
        Mô Tả Sản Phẩm
        <div
          className="mx-4 mb-4 text-sm leading-loose"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </div>
  );
}
