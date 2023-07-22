import { Button, Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/userSlice";

export default function Header() {
  const product = useSelector((state) => state.cart.cart);
  const userData = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  };

  return (
    <div>
      <div className="bg-[#0538e1] px-10 font-bold grid grid-cols-12 pb-3 text-white mb-5 ">
        <div className="flex col-span-3 mt-3 text-2xl">
          <Link to="/" className="flex items-center justify-between">
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
          <div className="flex justify-end">
            <Link
              to="/"
              className="flex items-center justify-center mx-3 mt-2 uppercase"
            >
              Trang Chủ
            </Link>
            <Popover
              title={
                <button
                  className="block w-full px-3 py-2 text-left bg-white"
                  onClick={handleLogout}
                >
                  Đăng Xuất
                </button>
              }
            >
              {userData ? (
                <div className="flex items-center w-auto h-5 mx-5 mt-4 uppercase">
                  {userData.name}
                </div>
              ) : (
                <div className="flex items-center mt-1 rounded-lg ">
                  <Link
                    to="/login"
                    className="flex items-center justify-center mx-3"
                  >
                    <img
                      src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                      alt="header_header_account_img"
                      className="w-6 h-6 mr-2"
                    />
                  </Link>
                </div>
              )}
            </Popover>

            <Link
              to="/cart"
              className="relative p-3 text-xl fa-solid fa-cart-shopping "
            >
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-sm text-black rounded-full bg-slate-300">
                {product.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
