import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faGlobe, faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './CartContext';
import { useProducts } from './ProductContext';
import logo from '/assets/logo.webp';

const Navbar = () => {
  const { cart, getTotalPrice } = useCart();
  const { searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    searchProducts(searchQuery);
  };

  return (
    <>
      <div className='grid grid-cols-5 bg-black py-10 px-20'>
        <div className='col-span-1'>
          <img src={logo} alt="logo" />
        </div>
        <div className='gap-2 flex col-span-2'>
          <button className='bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]'>
            <FontAwesomeIcon icon={faDollarSign} className='mr-2' />
            Currency
          </button>
          <button className='bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]'>
            <FontAwesomeIcon icon={faGlobe} className='mr-2' />
            Language
          </button>
          <button className='bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]'>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
            My Account
          </button>
        </div>
        <div className='col-span-1 flex justify-end items-center'>
          <input
            className='p-2 bg-black text-white border-b flex-grow'
            type="text"
            placeholder='Search entire store here...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className='bg-[#EC3642] text-white p-2 rounded-2xl mr-2 text-sm'
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className='col-span-1 flex justify-end items-center'>
          <Link to="/checkout" className='flex items-center bg-black text-white p-2 hover:text-[#EC3642] hover:border-[#EC3642]'>
            <FontAwesomeIcon icon={faShoppingCart} className='mr-2' />
            Cart {cart.length} items - <span className='text-2xl'>${getTotalPrice().toFixed(2)}</span>
          </Link>
        </div>
      </div>

      <div className='bg-[#EC3642] px-20'>
        <ul id='ul'>
          <li className='li'>
            <Link to="/">HOME</Link>
          </li>
          <li className='li'>
            <a href="#men">MEN</a>
          </li>
          <li className='li'>
            <a href="#women">WOMEN</a>
          </li>
          <li className='li'>
            <a href="#special">SPECIAL</a>
          </li>
          <li className='li'>
            <Link to="/about-us">ABOUT US</Link>
          </li>
          <li className='li'>
            <Link to="/contact-us">CONTACT US</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
