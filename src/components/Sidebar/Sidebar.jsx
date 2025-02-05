import React from "react";
import Price from "./Price";
import TypeofBook from "./TypeofBook";
import { Divider } from "antd";
export default function Sidebar({ handleChange }) {
  return (
    <div className="p-5 bg-white rounded-xl">
      <div className="text-2xl font-semibold">Bộ Lọc</div>
      <Divider className="my-5" />
      <Price handleChange={handleChange} />
      <Divider className="my-5" />
      <TypeofBook handleChange={handleChange} />
    </div>
  );
}
