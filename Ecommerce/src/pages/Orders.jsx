import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="flex flex-col gap-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left: Image + Product Info */}
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20 rounded-md" src={item.image[0]} alt={item.name} />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-700">
                  <p className="text-base font-semibold">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2 text-sm">
                  Date:{' '}
                  <span className="text-gray-400">25 Jul 2024</span>
                </p>
              </div>
            </div>

            {/* Right: Status */}
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm md:text-base">Ready to Ship</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
