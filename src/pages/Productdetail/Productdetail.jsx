import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addToCart,
  getSingleProducts,
  getUsersCart,
  updateCart,
} from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addBagCount } from "../../store/slices/bagSlice";

const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const bagCount = useSelector((state) => state.bags);

  useEffect(() => {
    (async () => {
      const res = await getSingleProducts(id);
      if (res) {
        setProduct(res);
      }
    })();
  }, []);

  const addCard = async () => {
    let payload = {
      userId: 1,
      products: [{ productId: id, quantity: 1 }],
    };
    const data = await addToCart(payload);
  
  
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cartData.find(item => item.products[0].productId === id);
  
    if (existingProduct) {
      existingProduct.products[0].quantity += 1;
    } else {
      dispatch(addBagCount({ count: bagCount + 1 }));
      cartData.push(data);
    }
  
    localStorage.setItem("cart", JSON.stringify(cartData));
  };
  

  return (
    <div className="p-5 border-b mb-4">
      <div className="grid grid-cols-12 mt-6 gap-x-10 items-center">
        <div className="col-span-12 lg:col-span-5">
          <img src={product.image} alt="image" className="h-[500px] w-auto mx-auto lg:me-auto" />
        </div>
        <div className="col-span-12 lg:col-span-7 pt-6 lg:pt-0 text-center lg:text-start">
          <div className="text-black text-2xl font-semibold">
            {product.title}
          </div>
          <div className="text-gray-400 text-lg pt-4">
            {product.description}
          </div>
          <div className="text-lg pt-4 font-medium">
            {" "}
            Category : {product?.category}
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-2">
            {/* Display star rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product?.rating?.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15.27L16.18 20 14.54 12.97 20 8.24l-7.19-.61L10 1 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
              </svg>
            ))}
            <span className="ml-2 text-lg text-gray-600">
              {product?.rating?.count} Ratings
            </span>

            {/* Price & Add to Cart Button */}
          </div>
          <div className="mt-4">
            <span className="text-xl font-bold text-indigo-600">
              ${product.price}
            </span>
          </div>
          <div className="mt-6 inline-block">
            <div
              onClick={() => addCard()}
              className="bg-indigo-500 cursor-pointer font-semibold text-white py-2 px-3 rounded hover:bg-indigo-600 transition-colors duration-300"
            >
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
