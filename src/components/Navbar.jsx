import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { filter, getCartByUserID } from "../redux/storeAPIs.js";
import logo from "/assets/logo.webp";
import { useAuth } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.data.cart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getTotalPrice = () =>
    cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAccountClick = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout().then(() => navigate("/"));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(filter(searchQuery));
    }
  };

  const fetchCartDataByUserID = () => {
    dispatch(getCartByUserID(user._id));
  };

  useEffect(() => {
    if (user?._id) {
      fetchCartDataByUserID();
    }
  }, [user?._id]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Original version for large screens */}
      <div className="hidden lg:block">
        {/* Keep your entire existing code here without any modifications */}
        <div className="grid grid-cols-5 bg-black py-10 px-20">
          <div className="col-span-1">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="gap-2 flex col-span-2">
            <button
              className="bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]"
              aria-label="Change Currency"
            >
              Currency
            </button>
            <button
              className="bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]"
              aria-label="Change Language"
            >
              Language
            </button>
            <button
              className="bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]"
              onClick={handleAccountClick}
              aria-label={user ? `Hi ${user.name.split(" ")[0]}` : "My Account"}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {user ? `Hi ${user.name.split(" ")[0]}!` : "My Account"}
            </button>
            {user && (
              <button
                className="bg-black p-2 text-sm text-white border border-white hover:bg-[#EC3642] hover:border-[#EC3642]"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <input
              className="p-2 bg-black text-white border-b flex-grow"
              type="text"
              placeholder="Search entire store here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button
              className="bg-[#EC3642] text-white p-2 rounded-2xl mr-2 text-sm"
              onClick={handleSearch}
              aria-label="Search Button"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <Link
              to="/checkout"
              className="flex items-center bg-black text-white p-2 hover:text-[#EC3642] hover:border-[#EC3642]"
              aria-label={`Cart with ${
                cart?.items?.length || 0
              } items totaling $`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart {cart?.items?.length || 0} items
            </Link>
          </div>
        </div>

        <div className="bg-[#EC3642] px-20">
          <ul id="ul">
            <li className="li">
              <Link to="/">HOME</Link>
            </li>
            <li className="li">
              <Link to="/men-category">MEN</Link>
            </li>
            <li className="li">
              <Link to="/women-category">WOMEN</Link>
            </li>
            <li className="li">
              <a href="/faqs">FAQs</a>
            </li>
            <li className="li">
              <Link to="/about-us">ABOUT US</Link>
            </li>
            <li className="li">
              <Link to="/contact-us">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Responsive version for smaller screens */}
      <div className="lg:hidden">
        <div className="grid grid-cols-3 bg-black py-4 px-4 ">
          {/* Logo */}
          <div className="col-span-1 flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="col-span-1 flex justify-center items-center">
            <Link
              to="/checkout"
              className="flex items-center bg-black text-white p-2  text-[14px] hover:text-[#EC3642] hover:border-[#EC3642]"
              aria-label={`Cart with ${
                cart?.items?.length || 0
              } items totaling $`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart {cart?.items?.length || 0} items
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="col-span-1 flex justify-end items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-xl"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="bg-[#EC3642] p-4">
            <ul className="space-y-4">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/men-category" onClick={() => setIsMenuOpen(false)}>
                  MEN
                </Link>
              </li>
              <li>
                <Link to="/women-category" onClick={() => setIsMenuOpen(false)}>
                  WOMEN
                </Link>
              </li>
              <li>
                <Link to="/faqs" onClick={() => setIsMenuOpen(false)}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>
                  CONTACT US
                </Link>
              </li>
              <li>
                <button
                  onClick={handleAccountClick}
                  className="bg-black p-2 text-sm text-white border border-white w-full"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {user ? `Hi ${user.name.split(" ")[0]}!` : "My Account"}
                </button>
              </li>
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-black p-2 text-sm text-white border border-white w-full"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
