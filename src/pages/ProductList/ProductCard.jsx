import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className=" bg-white border border-blue-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={product.image}
        alt={product.title}
      />

      {/* Product Details */}
      <div className="py-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{product.description}</p>

         {/* Rating Section */}
         <div className="flex items-center mt-2">
            {/* Display star rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15.27L16.18 20 14.54 12.97 20 8.24l-7.19-.61L10 1 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
              </svg>
            ))}
          <span className="ml-2 text-sm text-gray-600">{product.rating.count} Ratings</span>
        </div>


        {/* Price & Add to View Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-indigo-600">${product.price}</span>
          <Link to={`/product-detail/${product.id}`} className="bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600 transition-colors duration-300">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
