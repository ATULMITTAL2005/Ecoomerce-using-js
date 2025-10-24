import React from 'react'
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src ={logo} className='mb-5 w-32'/>
                <p className='w-full md:w-2/3'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam deserunt illo quod omnis accusantium voluptates praesentium ut quidem, ducimus iusto nulla enim, impedit quas amet? Inventore ducimus consequatur quisquam.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5  '>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='hover:black-200'>Home</li>
                    <li  className='hover:black-200'>About</li>
                    <li  className='hover:black-200'>Delivery</li>
                    <li  className='hover:black-200'>Privacy Policy</li> </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><a href = "tel:+919992156915">9992156915</a></li>
                    <li><a href="mailto:freeSeva4200@gmail.com">freeseva4200@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <div><hr/>
        <p className='py-5 text-sm text-center'>Copyright 2025@ EverythingSuits.com-All Right Reserved</p></div>
    </div>
  )
}

export default Footer 