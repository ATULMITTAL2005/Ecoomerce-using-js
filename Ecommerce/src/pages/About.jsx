import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="text-center pt-8 border-t">
      {/* Section Title */}
      <h2 className="text-2xl mb-6">
        <Title text1="ABOUT" text2="US" />
      </h2>

      {/* Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center justify-center text-gray-700 px-6 sm:px-12">
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full md:max-w-[450px] rounded-lg"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-left">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, non! Facere
            voluptatum perferendis impedit minus, fuga exercitationem in incidunt aliquid
            ratione dicta ea voluptatem nisi laborum fugit suscipit ad voluptatibus.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tenetur magnam,
            saepe provident laborum animi doloribus. Eum esse facere omnis dolore nostrum
            laboriosam maxime recusandae delectus. Ullam quaerat aut excepturi!
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission at <b>Forever</b> is to empower customers with choice, convenience, and
            confidence. We aim to deliver top-quality products with exceptional service every
            time.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-3xl sm:text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 px-6 sm:px-12 gap-6">
        <div className="border px-10 md:px-16 py-10 flex flex-col gap-5 flex-1 rounded-lg shadow-sm">
          <b>Quality Assurance</b>
          <p>
            We meticulously select and vet each product to ensure it meets our strict quality
            standards.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-10 flex flex-col gap-5 flex-1 rounded-lg shadow-sm">
          <b>Convenience</b>
          <p>
            Enjoy a seamless shopping experience with fast delivery, secure payments, and easy
            returns.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-10 flex flex-col gap-5 flex-1 rounded-lg shadow-sm">
          <b>Exceptional Customer Service</b>
          <p>
            Our support team is always ready to assist you — before, during, and after your
            purchase.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
