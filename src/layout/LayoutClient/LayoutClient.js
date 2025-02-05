import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LayoutClient({ children }) {
  return (
    <div className="bg-[#e6e7eb]">
      <div className="flex justify-center bg-red-700 sm:px-6">
        <img
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/ctthang12_herobanner_1263x60.jpg"
          alt="banner"
          width="80%"
        />
      </div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
