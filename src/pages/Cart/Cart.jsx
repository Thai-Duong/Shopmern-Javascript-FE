import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemCart from "../../components/ItemCart";
import {
  clearCart,
  delToCart,
  descreaseCart,
  increaseCart,
} from "../../redux/cartSlice";
import { formatCurrency } from "../../utils/utils";

export default function Cart() {
  const { cart, totalAmount } = useSelector((state) => state.cart);
  const dispacth = useDispatch();
  const hanldeDelToCart = (item) => {
    dispacth(delToCart(item));
  };
  const hanldePlusCart = (item) => {
    dispacth(increaseCart(item));
  };
  const hanldeMinusCart = (item) => {
    dispacth(descreaseCart(item));
  };
  const hanldeClearCart = () => {
    dispacth(clearCart());
  };
  return (
    <div className="px-4 mx-auto mt-10 max-w-7xl">
      {cart.length > 0 ? (
        <div className="px-[100px]">
          {cart.length > 0 &&
            cart.map((item) => (
              <ItemCart
                key={item.id}
                item={item}
                hanldeDelToCart={hanldeDelToCart}
                hanldeMinusCart={hanldeMinusCart}
                hanldePlusCart={hanldePlusCart}
              ></ItemCart>
            ))}
          <div className="flex justify-between">
            <button
              className="p-3 text-white bg-red-500 border"
              onClick={() => hanldeClearCart()}
            >
              Xóa Tất Cả Sản Phẩm
            </button>
            <div className="flex">
              <div className="my-auto mr-5 text-2xl">
                Thành Tiền: {formatCurrency(totalAmount)}
              </div>
              <Link
                className="px-3 py-2 my-auto text-xl bg-blue-300 border"
                to="/payment"
              >
                Thanh Toán
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
            alt=""
          />
        </div>
      )}
    </div>
  );
}
