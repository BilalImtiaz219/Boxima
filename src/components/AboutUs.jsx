import React from 'react';
import aboutImage from '/assets/slider2.webp'; 

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#1D1D1D] text-white p-10 flex">
      <div className="w-1/2 pr-10 py-20">
        <img src={aboutImage} alt="About Us" className="w-full h-full object-cover rounded-3xl" />
      </div>
      <div className="w-1/2 p-20">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Boxima, your one-stop destination for all things fitness! At our store, we are more than just a place to buy gym equipment; we are a community of fitness enthusiasts committed to helping you achieve your health and wellness goals.
        </p>
        <p className="text-lg mb-4">
          Our mission is to empower you to live a healthier, stronger, and more active life. Whether you're a seasoned athlete or just beginning your fitness journey, we offer a wide range of top-quality products that cater to all levels of fitness. From cutting-edge workout gear and equipment to high-performance apparel and accessories, we ensure that every product in our store meets the highest standards of quality and durability.
        </p>
        <p className="text-lg mb-4">
          We understand that fitness is a personal journey, and we are here to support you every step of the way. Our knowledgeable team is always ready to assist you in finding the right products that suit your needs and preferences. We take pride in offering personalized service, making sure that you leave our store feeling confident and motivated to reach your fitness goals.
        </p>
        <p className="text-lg">
          Thank you for choosing [Your Store Name] as your trusted partner in fitness. We look forward to being a part of your journey towards a healthier and more active lifestyle. Together, let's push the boundaries and achieve new heights in fitness!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
