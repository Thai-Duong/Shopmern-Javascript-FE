import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#dd1c2e] text-white py-5">
      <div className="text-center ">
        <Link to="/">
          <p>
            <strong>Địa Chỉ: </strong>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM
            Công Ty Cổ Phần Phát Hành Sách TP HCM - 62 Lê Lợi, Quận 1, TP. HCM,
            Việt Nam
          </p>
          <p>
            <strong>Số Điện Thoại: </strong>0376637529
          </p>
          <p>
            <strong>Giờ Làm Việc: </strong>8:20 - 17:50 Tất Cả Ngày Trong Tuần
            (Trừ Chủ Nhật)
          </p>
        </Link>

        <div className="flex flex-col justify-between gap-3 mt-2">
          <div className="text-lg font-bold">Contact</div>
          <Link to="#">Điều Khoản Sử Dụng</Link>
          <Link to="#">Chính sách bảo mật thông tin cá nhân</Link>
          <Link to="#">Chính sách bảo mật thanh toán</Link>
          <Link to="#">Giới thiệu chúng tôi</Link>
          <Link to="#">Hệ thống nhà sách</Link>
        </div>
      </div>
    </div>
  );
}
