import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems,setCartItems] = useState({});
  const navigate= useNavigate();


  const addToCart = async(itemId,size) =>{

    if(!size){
      toast.error('select Product Size');
      return;
    }
    // make copy of cart items
    let cartData = structuredClone(cartItems);
     if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1;
      }
      else{
        cartData[itemId][size] = 1;
      }
     }
     else{
       cartData[itemId]={};
       cartData[itemId][size]= 1;
     }
     setCartItems(cartData);
  }

 

const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      try {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      } catch (error) {
        // ignore errors
      }
    }
  }
  return totalCount;
}

const upadateQuantity = async(itemId,size,quantity)=>{
   let cartData= structuredClone(cartItems);
   cartData[itemId][size] =quantity;
   setCartItems(cartData);
}
const getCartAmount = () => {
  let totalAmount = 0;

  for (const productId in cartItems) {
    const itemInfo = products.find(product => product._id === productId);
    if (!itemInfo) continue; // skip if product not found

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,addToCart,
    getCartCount,
    upadateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
