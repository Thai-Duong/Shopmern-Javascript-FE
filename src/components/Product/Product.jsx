import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/auth";

export default function Product({ item }) {
  return (
    <Link to={`${"/products/"}${item._id}`}>
      <div className="rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            className="absolute top-0 left-0 object-cover w-full h-full bg-white"
            src={item.image}
            alt=""
          />
        </div>
        <div className="p-2 overflow-hiden ">
          <div className="min-h-[1.5rem] text-sm line-clamp-1">{item.name}</div>
          <div className="mt-2 ml-1 truncate text-orangw">
            <span className="text-xs">₫</span>
            <span>{formatCurrency(item.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
