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
import { Button } from "antd";

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
        <div className="xl:px-[100px]">
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
            <Button
              type="primary"
              danger
              onClick={() => hanldeClearCart()}
              size="large"
            >
              Xóa Tất Cả Sản Phẩm
            </Button>
            <div className="flex">
              <div className="my-auto mr-3 text-xl xl:text-2xl">
                Thành Tiền: {formatCurrency(totalAmount)}
              </div>
              <Link
                className="px-3 py-2 my-auto text-sm bg-blue-300 border xl:text-xl"
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
