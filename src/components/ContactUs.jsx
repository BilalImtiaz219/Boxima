import React from 'react';
import contactImage from '/assets/slider1.webp'; // Replace with the correct path to your image

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-[#EC3642] p-10 flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-0 py-10 md:py-20">
        <img src={contactImage} alt="Contact Us" className="w-full h-auto object-cover rounded-3xl" />
      </div>
      <div className="md:w-1/2 p-5 md:p-20">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-4 text-gray-500">
          We would love to hear from you! Please fill out the form below to get in touch with us.
        </p>
        <form className="text-left bg-[#EC3642] p-8 rounded-xl">
          <div className="mb-4">
            <label className="block text-white mb-2">Name</label>
            <input 
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-700" 
              type="text" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input 
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-700" 
              type="email" 
              placeholder="Enter your email" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Message</label>
            <textarea 
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-700" 
              rows="4" 
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button className="bg-white text-[#EC3642] p-2 w-full rounded-md hover:bg-[#1D1D1D] hover:text-white transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
