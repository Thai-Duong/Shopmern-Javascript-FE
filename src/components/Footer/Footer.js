import React from "react";

export default function Footer() {
  return (
    <div className="p-4 mx-auto mt-5 text-black bg-white rounded-lg max-w-7xl">
      <div className="flex gap-3">
        <div className="w-[380px] flex flex-col gap-3 mt-4">
          <img src="/fahasa-logo.webp" alt="" />
          <p className="text-sm">
            Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành
            Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam.
          </p>
          <p className="text-sm">
            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
            trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ
            Thống Fahasa trên toàn quốc.
          </p>
          <img src="./footer/thong-bao1.webp" alt="" className="w-[100px]" />
          <div className="flex gap-3">
            <img src="./footer/Facebook-on.webp" alt="" />
            <img src="./footer/Insta-on.webp" alt="" />
            <img src="./footer/Youtube-on.webp" alt="" />
            <img src="./footer/tumblr-on.webp" alt="" />
            <img src="./footer/twitter-on.webp" alt="" />
            <img src="./footer/pinterest-on.webp" alt="" />
          </div>
          <div className="flex gap-2">
            <img src="./footer/android1.webp" alt="" className="w-[120px]" />
            <img src="./footer/appstore1.webp" alt="" className="w-[120px]" />
          </div>
        </div>
        <div className="w-[0.5px] text-black bg-gray-200 h-sceen"></div>
        <div className="">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 text-sm">
              <div className="mb-2 text-lg font-bold">DỊCH VỤ</div>
              <div>Điều khoản sử dụng</div>
              <div>Chính sách bảo mật thông tin cá nhân</div>
              <div>Chính sách bảo mật thanh toán</div>
              <div>Giới thiệu Fahasa</div>
              <div>Hệ thống trung tâm - nhà sách</div>
            </div>{" "}
            <div className="flex flex-col gap-2 text-sm">
              <div className="mb-2 text-lg font-bold">DỊCH VỤ</div>
              <div>Điều khoản sử dụng</div>
              <div>Chính sách bảo mật thông tin cá nhân</div>
              <div>Chính sách bảo mật thanh toán</div>
              <div>Giới thiệu Fahasa</div>
              <div>Hệ thống trung tâm - nhà sách</div>
            </div>{" "}
            <div className="flex flex-col gap-2 text-sm">
              <div className="mb-2 text-lg font-bold">DỊCH VỤ</div>
              <div>Điều khoản sử dụng</div>
              <div>Chính sách bảo mật thông tin cá nhân</div>
              <div>Chính sách bảo mật thanh toán</div>
              <div>Giới thiệu Fahasa</div>
              <div>Hệ thống trung tâm - nhà sách</div>
            </div>
          </div>
          <div>
            <div className="flex gap-3 my-10 text-sm">
              <img
                src="./footer/ahamove_logo3.webp"
                alt=""
                className="w-[180px]"
              />
              <img
                src="./footer/icon_snappy1.webp"
                alt=""
                className="w-[150px]"
              />
              <img
                src="./footer/Logo_ninjavan.webp"
                alt=""
                className="w-[150px]"
              />
              <img
                src="./footer/vnpay_logo.webp"
                alt=""
                className="w-[150px]"
              />
              <img src="./footer/vnpost1.webp" alt="" className="w-[150px]" />
            </div>
            <div className="flex justify-center gap-14">
              <img
                src="./footer/momopay.webp"
                alt=""
                className="w-[50px] h-[50px]"
              />
              <img
                src="./footer/vnpay_logo.webp"
                alt=""
                className="w-150px] h-[50px]"
              />
              <img
                src="./footer/shopeepay_logo.webp"
                alt=""
                className="w-[120px] h-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 text-xs text-center text-gray-500">
        Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu
        tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ
        10, ngày 20/05/2022.
      </div>
    </div>
  );
}
