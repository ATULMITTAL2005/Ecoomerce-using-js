import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products, backendUrl } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  // Fetch bestsellers directly from backend so the list reflects
  // database changes without depending on the cached `products` array.
  useEffect(() => {
    let mounted = true;

    const fetchBest = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/product/list?bestseller=true&limit=5`
        );
        if (!mounted) return;
        if (res.data && res.data.success)
          setBestSeller(res.data.products || []);
      } catch (err) {
        console.error("Failed to fetch bestsellers", err);
        // fallback to filtering products from context if available
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
      }
    };

    fetchBest();

    return () => {
      mounted = false;
    };
    // include backendUrl and products as dependencies so it refetches when backendUrl changes
  }, [backendUrl, products]);

  return (
    <div className="my-20">
      {/* Heading */}
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis,
          temporibus corporis qui sit dolores quibusdam expedita! Fugit alias
          numquam laborum ipsam placeat? Unde hic optio corrupti, ad eveniet
          harum dignissimos!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
