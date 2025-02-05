import { Image, Rate } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Feedback from "../../components/Feedback/Feedback";
import { addToCart } from "../../redux/cartSlice";
import {
  calculateDiscount,
  formatCurrency,
  getIdFormNameId,
  getStringtoYear,
} from "../../utils/utils";

export default function Detail() {
  const { id } = useParams();
  const nameId = getIdFormNameId(id);
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
    <div className="mx-auto mt-5 max-w-7xl">
      <div className="grid grid-cols-12 lg:gap-9">
        <div className="h-full col-span-6 p-5 bg-white rounded-lg lg:col-span-5">
          <Image.PreviewGroup>
            <Image
              width={450}
              height={450}
              src={product.image}
              className="object-contain"
            />
          </Image.PreviewGroup>
          <div className="grid grid-flow-col gap-3 mt-3 justify-stretch">
            <div
              onClick={() => hanldeAddToCart(product)}
              className="flex items-center justify-center w-full h-12 font-semibold text-red-800 capitalize border border-red-800 rounded-lg "
            >
              Thêm Vào Giỏ Hàng
            </div>
            <div
              onClick={() => {
                hanldeAddToCart(product);
                navigator("/cart");
              }}
              className="flex items-center justify-center w-full h-12 px-10 text-white capitalize bg-red-600 border rounded-lg hover:bg-red-300"
            >
              Mua Ngay
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-7">
          <div className="p-3 bg-white rounded-lg">
            <div className="mt-3 ml-2 text-2xl font-medium uppercase">
              {product.name}
            </div>
            <div className="grid grid-cols-2 p-2 text-sm">
              <div className="col-span-1">
                Nhà Sản Xuất :
                <span className="ml-3 text-blue-500 uppercase">
                  {product.type ? product.type : " Chưa có thông tin"}
                </span>
              </div>
              <div className="col-span-1 ">
                Tác Giả :
                <span className="ml-3 font-bold uppercase">
                  {product.author ? product.author : " Chưa có thông tin"}
                </span>
              </div>
              <div className="col-span-1 ">
                Nhà Xuất Bản :
                <span className="ml-3 text-blue-500 uppercase">
                  {product.type ? product.type : " Chưa có thông tin"}
                </span>
              </div>{" "}
              <div className="col-span-1 ">
                Thể Loại :
                <span className="ml-3 text-blue-500 uppercase">
                  {product.type ? product.type : " Chưa có thông tin"}
                </span>
              </div>{" "}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Rate />
              <div className="mt-2 text-yellow-600">(0 Đánh Giá)</div>
              <div className="mt-2">Đã Bán 100</div>
            </div>
            <div className="flex gap-2 p-2">
              <div className="text-4xl font-bold text-red-500">
                {formatCurrency(product.price)} ₫
              </div>
              {product.price !== product.price_before_discount ? (
                <>
                  <div className="mt-1 ml-1 text-sm line-through truncate">
                    <span>{formatCurrency(product.price_before_discount)}</span>
                    <span className="m-1 text-sm">₫</span>
                  </div>
                  <div className="px-1 m-2 font-bold text-white bg-red-500 rounded-lg">
                    {calculateDiscount(
                      product.price,
                      product.price_before_discount
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="p-5 mt-3 bg-white rounded-lg">
            <div className="font-semibold ">Thông Tin Chi Tiết</div>
            <div className="flex flex-row gap-20 my-5">
              <div className="flex flex-col gap-3 text-gray-500">
                <div className="">Nhà Sản Xuất</div>
                <div className="">Nhà Xuất Bản</div>
                <div className="">Tác Giả</div>
                <div className="">Số Trang</div>
                <div className="">Năm Xuất Bản</div>
                <div className="">Ngôn Ngữ</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="">
                  {product.supplier ? product.supplier : " Chưa có thông tin"}
                </div>
                <div className="">
                  {product.publisher ? product.publisher : " Chưa có thông tin"}
                </div>
                <div className="">
                  {product.author ? product.author : " Chưa có thông tin"}
                </div>
                <div className="">
                  {product.page ? product.page : " Chưa có thông tin"}
                </div>
                <div className="">
                  {product.yearPublish
                    ? getStringtoYear(product.yearPublish)
                    : " Chưa có thông tin"}
                </div>
                <div className="">
                  {product.language ? product.language : " Chưa có thông tin"}
                </div>
              </div>
            </div>
            <p className="text-sm">
              Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành.
              Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng
              mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí
              vận chuyển, phụ phí hàng cồng kềnh,... Chính sách khuyến mãi trên
              Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn
              quốc
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 mt-5 text-lg capitalize rounded-xl bg-gray-50 text-slate-700">
        Mô Tả Sản Phẩm
        <div
          className="mx-4 mb-4 text-sm leading-loose"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
      <Feedback
        productId={product._id}
        productName={product.name}
        userName={user.name}
      />
    </div>
  );
}
