import React, { useEffect, useState, useCallback } from "react";
import { getProducts, getCategories } from "../../utils/axiosInstance"; // Ensure getCategories is defined
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterProduct, setFilteredProduct] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const filterProductsData = () => {
    const filteredProducts = productList.filter((product) => {
      const meetsRating = product.rating.rate >= minRating;
      const inCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return meetsRating && inCategory && inPriceRange;
    });
    setFilteredProduct([...filteredProducts]);
  };

  const loadProducts = useCallback(async () => {
    const res = await getProducts(productsPerPage);
    if (res) {
      const maxProductPrice = Math.max(...res.map((product) => product.price));
      setPriceRange((prev) => {
        const newRange = [...prev];
        if (prev[1] === 100) {
          newRange[1] = maxProductPrice;
        }
        return newRange;
      });
      if (selectedCategories.length > 0) {
        filterProductsData();
      } else {
        setProductList([...res]);
      }
    }
  }, [productsPerPage]);

  const loadCategories = async () => {
    const res = await getCategories();
    if (res) {
      setCategories(res);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      setProductsPerPage((prev) => prev + 6);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    setPriceRange((prev) => {
      const newRange = [...prev];
      if (name === "min") {
        newRange[0] = Number(value);
      } else {
        newRange[1] = Number(value);
      }
      return [...newRange];
    });
  };

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value));
    filterProductsData();
  };

  useEffect(() => {
    filterProductsData();
  }, [selectedCategories, priceRange]);

  return (
    <div>
      {/* Filter Section */}
      <div className="p-5 border-b mb-4">
        <h2 className="text-2xl font-bold underline underline-offset-4">
          Filters
        </h2>

        <div className="block text-center md:text-start md:flex justify-between">
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            {categories.map((category) => (
              <label
                key={category}
                className="block text-center  md:text-start md:flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="me-2"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="mb-4">
            <h3 className="font-semibold">Price Range</h3>
            <input
              type="range"
              name="min"
              min="0"
              max="100" // Adjust according to your needs
              value={priceRange[0]}
              onChange={handlePriceChange}
            />
            <input
              type="range"
              name="max"
              min="0"
              max="100" // Adjust according to your needs
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
            <div>
              Price: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h3 className="font-semibold">Minimum Rating</h3>
            <select
              className="border border-gray-400 py-1 px-2 rounded-lg"
              value={minRating}
              onChange={handleRatingChange}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      {filterProduct.length > 0 || minRating > 1 ? (
        <div className="grid grid-cols-12 gap-5 px-5">
          {filterProduct.map((product, i) => (
            <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductList;
