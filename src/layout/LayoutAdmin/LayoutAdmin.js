import React from "react";
import MenuAdmin from "../../components/MenuAdmin";

export default function LayoutAdmin({ children }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-2">
        <MenuAdmin />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
}
