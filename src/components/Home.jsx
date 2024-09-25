import React, { useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/storeAPIs.js";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch products and filteredProducts from the Redux store
  const products = useSelector((state) => state.data.products);
  const filteredProducts = useSelector((state) => state.data.filteredProducts);

  const fetchAllProducts = async () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    console.log("Filtered Products: ", filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    if (dispatch) {
      fetchAllProducts();
    }
  }, [dispatch]);

  const productSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const carouselImages = ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg"];

  // Customer reviews for the slider
  const customerReviews = [
    {
      name: "John Doe",
      review: "This store exceeded my expectations! From the moment I placed my order to the day it arrived, everything was seamless. The quality of the products is outstanding, and they truly stand behind their craftsmanship. I’m especially impressed with their customer service — any questions I had were quickly answered. I will definitely be shopping here again!",
      image: "/assets/testimonial.webp",
    },
    {
      name: "Jane Smith",
      review: "I’ve been shopping online for a while now, and this experience was one of the best. The website was easy to navigate, and I loved the variety of products available. When my package arrived, I was thrilled with how carefully everything was packaged. The clothes fit perfectly, and I’ve already recommended this store to several of my friends. Can't wait for my next purchase!",

      image: "/assets/testimonial2.webp",
    },
    {
      name: "Robert Brown",
      review: "I was hesitant about buying online, but this store completely won me over. The product descriptions were accurate, and the items I received were just as described, if not better! The shipping was fast, and the customer service team was very helpful when I had a question about sizing. I’ll definitely be returning for more items soon. Highly recommend!",

      image: "/assets/testimonial3.webp",
    },
  ];

  // Determine whether to show filtered products or all products
  const productsToShow = filteredProducts.length > 0 ? filteredProducts : products;

  // Display a loading message if products are still being fetched
  if (!products || products.length === 0) {
    return (
      <div>
        <h1 className="text-white">Loading Products...</h1>
      </div>
    );
  }

  return (
    <div className="bg-[white] text-[#EC3642]">
      {/* Image Carousel */}
      <section id="image-carousel">
        <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`carousel ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </section>

      {/* Men's Category */}
      <section id="men-category" className="py-8 px-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#EC3642] font-bold">Men's Category</h2>
          <Link to="/men-category" className="text-sm text-[#EC3642] font-bold">
            See All Products
          </Link>
        </div>
        <Slider {...productSettings}>
          {productsToShow?.length > 0 &&
            productsToShow.slice(0, 6).map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </Slider>
      </section>

      {/* Women's Category */}
      <section id="women-category" className="py-20 px-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#EC3642] font-bold">Women's Category</h2>
          <Link to="/women-category" className="text-sm text-[#EC3642] font-bold">
            See All Products
          </Link>
        </div>
        <Slider {...productSettings}>
          {productsToShow?.length > 0 &&
            productsToShow.slice(-6).map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </Slider>
      </section>

      {/* Customer Reviews Slider */}
      <section id="customer-reviews" className="py-12 px-10 bg-[#f8f8f8]">
        <h2 className="text-2xl text-[#EC3642] font-bold text-center mb-6">
          What Our Customers Say
        </h2>
        <Slider {...carouselSettings}>
          {customerReviews.map((review, index) => (
            <div key={index} className="text-center p-4">
              <img
                src={review.image}
                alt={`Customer ${index}`}
                className="mx-auto mb-4 rounded-full h-24 w-24 object-cover"
              />
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-sm text-gray-600">{review.review}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Hero Section - FAQs */}
      <section id="faq-hero" className="py-16 bg-[#EC3642] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
        <p className="text-lg mb-6">
          Check out our FAQs page for answers to the most common questions.
        </p>
        <button
          className="px-8 py-3 bg-white text-[#EC3642] font-bold rounded-md"
          onClick={() => navigate("/faqs")}
        >
          Visit FAQs
        </button>
      </section>
    </div>
  );
};

export default ProductList;
