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
  const productList = useSelector((state) => state.product.productList);
  const user = useSelector((state) => state.user.profile);
  const product = productList.filter((el) => el._id === nameId)[0];
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
    <div>
      <div className="px-4 mx-auto mt-10 max-w-7xl">
        <div className="p-4 bg-white shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5 ">
              <div className="relative w-full cursor-zoom-in overflow-hidden pt-[100%]">
                <img
                  className="absolute top-0 left-0 object-cover w-full h-full bg-white pointer-events-none"
                  src={product.image}
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>

              <div className="flex items-center px-5 py-4 mt-8 bg-gray-50">
                <div className="mr-3 text-4xl font-bold text-red-500">
                  {formatCurrency(product.price)}₫
                </div>
              </div>
              <div className="flex items-center mt-7">
                <div className="mr-3 text-gray-500 capitalize">Số lượng</div>
              </div>
              <div className="flex items-center mt-8">
                <button
                  onClick={() => hanldeAddToCart(product)}
                  className="flex items-center justify-center h-12 px-10 text-white capitalize bg-red-600 border border-red-500 rounded-lg hover:bg-red-300"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 mt-3 text-lg capitalize rounded bg-gray-50 text-slate-700">
            Mô Tả Sản Phẩm
            <div className="mx-4 mb-4 text-sm leading-loose">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
