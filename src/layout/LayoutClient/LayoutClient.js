import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LayoutClient({ children }) {
  return (
    <div className="bg-gray-200">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
