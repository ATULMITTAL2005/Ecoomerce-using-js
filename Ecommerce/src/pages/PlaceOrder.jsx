import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const[method,setMehod] = useState('cod');
  const{navigate} = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10">
      {/* ++++++++++++++++ LEFT SIDE (Delivery Info) ++++++++++++++++ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street address"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zipcode"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* ++++++++++++++++++++ RIGHT SIDE (Cart + Payment) ++++++++++++++++++++ */}
      <div className="w-full sm:max-w-[480px] mt-8 sm:mt-0">
        <div className="mb-8">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          {/* +++++++++++++++++++++ Payment method selection +++++++++++++++++++++ */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div onClick={()=>setMehod(`stripe`)}className="flex items-center gap-3 border p-2 px-3 rounded-md cursor-pointer hover:border-black transition">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'? 'bg-green-400': ''}`} ></p>
              <img className="h-5 mx-5" src={assets.stripe_logo} alt="Stripe" />
              
            </div>

                 <div onClick={()=>setMehod(`Razorpay`)} className="flex items-center gap-3 border p-2 px-3 rounded-md cursor-pointer hover:border-black transition">
              <p className={`min-w-3.5 h-3.5 border rounded-full   ${method==='Razorpay'? 'bg-green-400': ''}`} ></p>
              <img className="h-5 mx-5" src={assets.razorpay_logo} alt="Stripe" />
              
            </div>

                <div onClick={()=>setMehod(`cod`)} className="flex items-center gap-3 border p-2 px-3 rounded-md cursor-pointer hover:border-black transition">
              <p className={`min-w-3.5 h-3.5 border rounded-full   ${method==='cod'? 'bg-green-400': ''}`} ></p>
              <p className="text-grey-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              
            </div>
          </div>

          {/* +++++++++++++++++++++ Place Order Button +++++++++++++++++++++ */}
        
          </div>
        </div>
        <div className="w-full text-end mt-8 ">
          <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div>
  
  )
}

export default PlaceOrder
