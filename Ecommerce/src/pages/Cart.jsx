import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 py-1 border border-gray-200 rounded-md bg-slate-50 text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border w-12 sm:w-20 px-1 py-1 text-center rounded"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Button */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          )
        })}
      </div>

      {/* Totals and Checkout */}
      <div className="flex flex-col sm:flex-row justify-end mt-10 sm:mt-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          {/* ✅ Button Below Total (Responsive) */}
          <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
            <button onClick={()=>navigate('/place-order') }className="bg-black text-white text-sm md:text-base px-5 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-gray-900 transition w-full sm:w-auto">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
