import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />

        <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
          {/* Subtotal */}
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
          </div>

          <hr className="border-gray-300" />

          {/* Shipping Fee */}
          <div className="flex justify-between">
            <p>Shipping fee</p>
            <p>{currency}{delivery_fee}</p>
          </div>

          <hr className="border-gray-300" />

          {/* Total */}
          <div className="flex justify-between font-semibold text-base">
            <b>Total</b>
            <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
