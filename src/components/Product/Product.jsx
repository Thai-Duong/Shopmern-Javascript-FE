import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency, generateNameId } from "../../utils/utils";
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
          width: 200,
          height: 300,
        }}
        cover={
          <img
            alt="photoProduct"
            src={item.image}
            className="h-[200px] border"
          />
        }
      >
        <div className="min-h-[1.5rem] text-sm line-clamp-1 font-bold">
          {item.name}
        </div>
        <div className="mt-2 ml-1 truncate text-orangw">
          <span>{formatCurrency(item.price)}</span>
          <span className="m-1 text-sm">₫</span>
        </div>
      </Card>
    </Link>
  );
}
