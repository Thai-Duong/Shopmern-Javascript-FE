import React from "react";
import { formatCurrency } from "../../utils/utils";

export default function ItemCart({
  item,
  hanldeDelToCart,
  hanldeMinusCart,
  hanldePlusCart,
}) {
  return (
    <div
      key={item.id}
      className="grid items-center grid-cols-12 gap-2 m-2 border md:gap-7 "
    >
      <img
        src={item.image}
        alt=""
        className="h-full col-span-4 rounded-l-lg md:col-span-2"
      />
      <div className="col-span-8 md:col-span-10">
        <div className="justify-between gap-2 py-2 ml-5 text-sm md:flex">
          <div className="font-bold">{item.name}</div>
          <div>{formatCurrency(item.price)} đ</div>
          <div className="flex ">
            <button onClick={() => hanldeMinusCart(item)}>➖</button>
            <div className="px-3 border">{item.cartQuantity}</div>
            <button onClick={() => hanldePlusCart(item)}>➕</button>
          </div>
          <div className="font-bold text-red-800 ">
            {formatCurrency(item.price * item.cartQuantity)} đ
          </div>
          <div className="flex justify-end">
            <button className="mr-5" onClick={() => hanldeDelToCart(item)}>
              XÓA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
