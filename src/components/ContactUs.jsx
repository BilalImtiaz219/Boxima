import React from 'react';
import contactImage from '/assets/slider1.webp'; // Replace with the correct path to your image

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#1D1D1D] text-white p-0 flex">
      <div className="w-1/2 pr-10 py-20">
        <img src={contactImage} alt="Contact Us" className="w-full h-full object-cover rounded-3xl" />
      </div>
      <div className="w-1/2 p-20">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-4">We would love to hear from you! Please fill out the form below to get in touch with us.</p>
        <form className="text-left">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input className="w-full p-2 bg-black border border-white text-white" type="text" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input className="w-full p-2 bg-black border border-white text-white" type="email" placeholder="Your Email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea className="w-full p-2 bg-black border border-white text-white" placeholder="Your Message" rows="4"></textarea>
          </div>
          <button className="bg-[#EC3642] text-white p-2 hover:bg-[#1D1D1D] hover:text-[#EC3642]">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
