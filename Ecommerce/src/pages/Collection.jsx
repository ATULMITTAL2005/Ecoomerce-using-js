import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch, refreshProducts } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Toggle Subcategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Filtering is handled in useEffect when dependencies change

  // Sorting handled in useEffect when sortType changes

  // Apply filters when filters/search change
  useEffect(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  }, [category, subCategory, search, showSearch, products]);

  // Ensure latest products are fetched when this page mounts
  useEffect(() => {
    if (typeof refreshProducts === "function") refreshProducts();
  }, [refreshProducts]);

  // Sort when sort type changes
  useEffect(() => {
    // perform sorting inline to keep dependencies explicit
    setFilterProducts((prev) => {
      const fpCopy = [...prev];
      switch (sortType) {
        case "low-high":
          return fpCopy.sort((a, b) => a.price - b.price);
        case "high-low":
          return fpCopy.sort((a, b) => b.price - a.price);
        default:
          return fpCopy;
      }
    });
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src="/images/dropdown.png"
            alt="toggle"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="men"
                onChange={toggleCategory}
              />
              Men
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="women"
                onChange={toggleCategory}
              />
              Women
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="kids"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="topwear"
                onChange={toggleSubCategory}
              />
              Topwear
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="bottomwear"
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="winterwear"
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
