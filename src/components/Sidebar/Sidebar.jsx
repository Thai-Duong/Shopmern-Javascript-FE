import React from "react";
import Price from "./Price";
import TypeofBook from "./TypeofBook";
export default function Sidebar({ handleChange }) {
  return (
    <div className="p-5 bg-white rounded-xl">
      <div className="text-2xl font-semibold">Bộ Lọc</div>
      <Price handleChange={handleChange} />
      <TypeofBook handleChange={handleChange} />
    </div>
  );
}
