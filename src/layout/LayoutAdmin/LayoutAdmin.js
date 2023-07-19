import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuAdmin from "../../components/MenuAdmin";

export default function LayoutAdmin({ children }) {
  const userData = useSelector((state) => state.user.profile);

  return (
    <div>
      <div className="bg-[#0538e1] px-10 font-bold grid grid-cols-12 pb-3 text-white ">
        <div className="flex col-span-3 mt-3 text-2xl">
          <Link to="/admin" className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
            <div className="ml-2">TIKI</div>
          </Link>
        </div>
        <div className="flex items-center justify-end col-span-9 gap-3">
          {userData && (
            <div className="flex items-center w-auto h-5 m-3 uppercase">
              {userData.name}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 px-[100px] ">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
}
