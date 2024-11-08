import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const bagCount = useSelector((state) => state.bags);
  return (
    <div className="h-[80px] flex items-center justify-between px-10 bg-blue-100">
      <Link to={"/product-list"} className="text-3xl font-bold">
        E-commerce <span className="text-sm"> (Product List) </span>
      </Link>
      <div className="flex items-center justify-center">
        <div onClick={() => {
          localStorage.clear();
          navigate('/login')
        }} className="bg-blue-300 text-blue-900 h-[35px] font-semibold px-6 py-1 rounded-lg">
          Logout
        </div>
        <div>
          <div>
            <Link to="/cart" className="mx-3 text-xl d-flex">
              <div className="ms-3 relative">
                <GiShoppingBag className="text-gray-700" size={30} />
                <div className="absolute top-0 font-semibold right-0 bg-pink-600 px-1 py-0 h-4 flex items-center justify-center text-center text-white text-[14px] rounded-full">
                  {bagCount}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
