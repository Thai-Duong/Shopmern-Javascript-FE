import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import {
  formatCurrency,
  getIdFormNameId,
  getStringtoYear,
} from "../../utils/utils";

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
      <div className="grid grid-cols-12 bg-white shadow lg:gap-9 lg:p-4 rounded-xl">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative w-full cursor-zoom-in overflow-hidden pt-[100%]">
            <img
              className="px-[80px] absolute top-0 left-0 object-cover w-full h-full bg-white pointer-events-none"
              src={product.image}
              alt="img-book"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="mt-3 ml-2 text-2xl font-medium uppercase">
            {product.name}
          </div>
          <div className="mt-3 ml-2 text-lg ">Thể Loại :{product.type}</div>
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
          <div className="rounded-sm">
            <div className="mt-5 font-semibold">Thông Tin Sản Phẩm :</div>
            <div className="flex flex-row gap-5 my-5">
              <div className="flex flex-col gap-3 text-gray-500">
                <div className="">Nhà Sản Xuất</div>
                <div className="">Nhà Xuất Bản</div>
                <div className="">Tác Giả</div>
                <div className="">Số Trang</div>
                <div className="">Năm Xuất Bản</div>
                <div className="">Ngôn Ngữ</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="">{product.supplier}</div>
                <div className="">{product.publisher}</div>
                <div className="">{product.author}</div>
                <div className="">{product.page}</div>
                <div className="">{getStringtoYear(product.yearPublish)}</div>
                <div className="">{product.language}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-5 text-lg capitalize rounded-xl bg-gray-50 text-slate-700">
        Mô Tả Sản Phẩm
        <div
          className="mx-4 mb-4 text-sm leading-loose"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </div>
  );
}
