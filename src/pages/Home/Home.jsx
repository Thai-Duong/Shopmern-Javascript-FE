import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import { setProduct } from "../../redux/productSlice";

export default function Home() {
  const product = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const getProduct = async (data) => {
    const res = await axios.get("http://localhost:8080/products/getAll", data);
    dispatch(setProduct(res.data));
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <div className="">
        <div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {product &&
            product.map((item) => (
              <div className="col-span-1" key={item._id}>
                <Product item={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}