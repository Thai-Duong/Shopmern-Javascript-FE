import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import { setProduct } from "../../redux/productSlice";
import { REACT_API_URL } from "../../utils/http";
import Sidebar from "../../components/Sidebar/Sidebar";
export default function Home() {
  const product = useSelector((state) => state.product.products);
  const [category, setSelectCategory] = useState(null);
  const dispatch = useDispatch();

  const getProduct = async () => {
    const res = await axios.get(`${REACT_API_URL}/products/getAll`);
    dispatch(setProduct(res.data));
  };
  useEffect(() => {
    getProduct();
  }, []);
  const handleChange = (e) => {
    setSelectCategory(e.target.value);
  };
  const filterData = (product, selected) => {
    let filterJobs = product;
    if (selected) {
      filterJobs = filterJobs.filter(
        ({ price, type }) =>
          parseInt(price) <= parseInt(selected) || type === selected
      );
    }
    return filterJobs;
  };
  const result = filterData(product, category);

  return (
    <div className="flex px-4 mx-auto max-w-7xl">
      <div className="hidden lg:block w-full lg:w-[20%] mr-5">
        <Sidebar handleChange={handleChange} />
      </div>
      <div className="h-full lg:w-[80%] grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 ">
        {result.length > 0 ? (
          result.map((item) => (
            <div className="span-col-1">
              <Product item={item} />
            </div>
          ))
        ) : (
          <div className="p-2 font-semibold">KHÔNG CÓ SẢN PHẨM</div>
        )}
      </div>
    </div>
  );
}
