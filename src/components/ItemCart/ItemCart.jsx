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
      className="grid items-center grid-cols-6 gap-2 mb-2 border rounded-lg md:gap-7"
    >
      <img src={item.image} alt="" className="w-full" />
      <div className="text-sm">{item.name}</div>
      <div className="text-sm">{formatCurrency(item.price)}</div>
      <div className="flex">
        <div onClick={() => hanldePlusCart(item)}>➕</div>
        <div className="mx-3">{item.cartQuantity}</div>
        <button onClick={() => hanldeMinusCart(item)}>➖</button>
      </div>
      <div>{formatCurrency(item.price * item.cartQuantity)}</div>
      <div>
        <button onClick={() => hanldeDelToCart(item)}>XÓA</button>
      </div>
    </div>
  );
}
