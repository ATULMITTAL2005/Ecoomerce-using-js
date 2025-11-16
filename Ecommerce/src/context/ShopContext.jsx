import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "RS";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // -----------------------------
  // Add to Cart
  // -----------------------------
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    setCartItems((prev) => {
      const updated = structuredClone(prev);

      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = (updated[itemId][size] || 0) + 1;

      return updated;
    });
  };

  // -----------------------------
  // Cart Count
  // -----------------------------
  const getCartCount = () => {
    let total = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        total += cartItems[productId][size];
      }
    }

    return total;
  };

  // -----------------------------
  // Update Cart Quantity
  // -----------------------------
  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = quantity;
      return updated;
    });
  };

  // -----------------------------
  // Total Cart Amount
  // -----------------------------
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        totalAmount += product.price * cartItems[productId][size];
      }
    }

    return totalAmount;
  };

  // -----------------------------
  // Fetch All Products
  // -----------------------------
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        // 🟢 IMPORTANT FIX: Ensure bestseller exists
        const fixedProducts = response.data.products.map((p) => ({
          ...p,
          bestseller: Boolean(p.bestseller), // ensure exists
        }));

        setProducts(fixedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // -----------------------------
  // Exported Value
  // -----------------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    // allow consumers to request a fresh product list
    refreshProducts: getProductsData,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
