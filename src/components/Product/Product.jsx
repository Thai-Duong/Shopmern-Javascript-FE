import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
  formatCurrency,
  generateNameId,
  calculateDiscount,
} from "../../utils/utils";
export default function Product({ item }) {
  return (
    <Link
      to={`${"/products/"}${generateNameId({
        name: item.name,
        id: item._id,
      })}`}
    >
      <Card
        hoverable
        style={{
          height: "360px",
        }}
        cover={
          <img
            alt="photoProduct"
            src={item.image}
            className="h-[230px] border w-full px-5 py-2 object-contain"
          />
        }
      >
        <div className="min-h-[1.5rem] text-sm line-clamp-1 font-bold">
          {item.name}
        </div>
        <div className="flex">
          <div className="mt-2 ml-1 font-bold text-red-500 truncate">
            <span>{formatCurrency(item.price)}</span>
            <span className="m-1 text-sm">₫</span>
          </div>{" "}
          {item.price !== item.price_before_discount ? (
            <div className="bg-red-500 text-white font-bold rounded-lg m-2  px-1">
              {calculateDiscount(item.price, item.price_before_discount)}
            </div>
          ) : (
            ""
          )}
        </div>
        {item.price !== item.price_before_discount ? (
          <div className="mt-1 ml-1 text-sm line-through truncate">
            <span>{formatCurrency(item.price_before_discount)}</span>
            <span className="m-1 text-sm">₫</span>
          </div>
        ) : (
          ""
        )}
      </Card>
    </Link>
  );
}
