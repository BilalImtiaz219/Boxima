import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock, faTruck, faHeadset, faUndo, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGooglePlusG, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        {/* Company Info */}
        <div>
        <img src="/assets/logo.webp" alt="logo" className='mb-6' />
          <ul className='flex flex-col items-left '>
            <li className="mb-2 flex items-left">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              6688 Princess Road, London, UK
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
              (012) 800 456 789-987
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              support@plazathemes.com
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Work time: 8.00 - 22.00
            </li>
          </ul>
          <div className="flex mt-4">
            <a href="#" className="text-white mr-4"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="text-white mr-4"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-white mr-4"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="text-white mr-4"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="text-white"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>

        {/* Information Section */}
        <div>
          <h2 className="font-bold text-lg mb-4 text-white text-left">Information</h2>
          <ul className='flex flex-col items-start'>
            <li className="mb-2"><a href="#" className="block hover:underline">About Us</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Delivery Information</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Terms & Conditions</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Returns</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Site Map</a></li>
            <li><a href="#" className="block hover:underline">Gift Certificates</a></li>
          </ul>
        </div>

        {/* My Account Section */}
        <div>
          <h2 className="font-bold text-lg mb-4 text-white text-left">My Account</h2>
          <ul className='flex flex-col items-start'>
            <li className="mb-2"><a href="#" className="block hover:underline">My Account</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Order History</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Wish List</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Newsletter</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Affiliate</a></li>
            <li className="mb-2"><a href="#" className="block hover:underline">Specials</a></li>
            <li><a href="#" className="block hover:underline">International Orders</a></li>
          </ul>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="font-bold text-lg mb-4 text-white">Features</h2>
          <ul>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Free Shipping on all US orders
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faHeadset} className="mr-2" />
              Support 24/7
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faUndo} className="mr-2" />
              30 Days Return
            </li>
            <li className="mb-2 flex items-center">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              100% Payment Secure
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400">
        <p>Copyright © 2024 <span className="text-[#EC3642]">Boxima</span> All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
