import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#dd1c2e] text-white ">
      <div className="grid justify-between p-4 mx-auto mt-10 text-sm md:gap-20 md:text-lg md:grid-cols-4 max-w-7xl">
        <div>
          <NavLink to="/">
            <div className="flex gap-1 text-4xl font-bold text-yellow-300">
              <i className="fa-sharp fa-solid fa-bag-shopping"></i>
              <p>Shop</p>
            </div>
            <p>
              <strong>Địa Chỉ: </strong>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP
              HCM Công Ty Cổ Phần Phát Hành Sách TP HCM - 62 Lê Lợi, Quận 1, TP.
              HCM, Việt Nam
            </p>
            <p>
              <strong>Số Điện Thoại: </strong>0376637529
            </p>
            <p>
              <strong>Giờ Làm Việc: </strong>8:20 - 17:50 Tất Cả Ngày Trong Tuần
              (Trừ Chủ Nhật)
            </p>
          </NavLink>
        </div>
        <div className="flex flex-col justify-between gap-3 mt-2 ">
          <div className="text-lg font-bold">Website</div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/product">Product</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/user">Account</NavLink>
        </div>
        <div className="flex flex-col justify-between gap-3 mt-2">
          <div className="text-lg font-bold">Contact</div>
          <NavLink to="#">Điều Khoản Sử Dụng</NavLink>
          <NavLink to="#">Chính sách bảo mật thông tin cá nhân</NavLink>
          <NavLink to="#">Chính sách bảo mật thanh toán</NavLink>
          <NavLink to="#">Giới thiệu chúng tôi</NavLink>
          <NavLink to="#">Hệ thống nhà sách</NavLink>
        </div>
        <div className="flex flex-col justify-between gap-3 mt-2">
          <div className="text-lg font-bold">News</div>
          <div className="flex items-center border ">
            <input
              type="text"
              className="w-full px-3 py-2 border "
              placeholder="Email"
            />
            <span className="p-3 bg-[#dd1c2e] fa-solid fa-paper-plane"></span>
          </div>
          <h4>Follow</h4>
          <div className="flex flex-start md:text-xl gap-x-3">
            <NavLink to="#">
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fa-brands fa-youtube"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
