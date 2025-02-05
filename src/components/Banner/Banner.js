import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <div className="p-2 mx-auto max-w-7xl">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            speed={600}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Parallax, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="./banner/banner-big-1.webp"
                alt=""
                className="rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="./banner/banner-big-2.webp"
                alt=""
                className="rounded-xl"
              />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <img
                src="./banner/banner-big-3.webp"
                alt=""
                className="rounded-xl"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="block col-span-1">
          <img src="./banner/banner-1.webp" alt="" className="rounded-xl" />
          <img src="./banner/banner-2.webp" alt="" className="rounded-xl" />
        </div>
      </div>
      <div className="flex bg-none sm:hidden md:flex">
        <img src="./banner/banner-small-1.webp" alt="banner-small" />
        <img src="./banner/banner-small-2.webp" alt="banner-small" />
        <img src="./banner/banner-small-3.webp" alt="banner-small" />
        <img src="./banner/banner-small-4.webp" alt="banner-small" />
      </div>
    </div>
  );
}
