import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is the return policy?",
      answer:
        "We offer a 30-day return policy on all items. Products must be in original condition with tags attached. Refunds will be processed within 5-7 business days of receiving your return.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 3-5 business days for standard orders. Expedited shipping options are available at checkout for faster delivery.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs will vary based on your location and will be calculated at checkout.",
    },
    {
      question: "What size should I choose?",
      answer:
        "We provide detailed size guides for all our products to help you choose the best fit. If you're still unsure, feel free to contact our support team for personalized advice.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and Apple Pay.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order has shipped, you'll receive a confirmation email with a tracking number. You can use this to track your package on our website or through the carrier's site.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-gray-50 p-10 md:p-40">
        <h1 className="text-3xl text-center text-[#EC3642] font-bold mb-10">Frequently Asked Questions</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
              role="button"
              aria-expanded={openIndex === index}
              aria-controls={`faq-${index}`}
            >
              <h3 className="text-xl font-semibold text-[#EC3642] mb-3">{faq.question}</h3>
              {openIndex === index && (
                <p className="text-gray-700" id={`faq-${index}`}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Hero Section */}
      <div className="p-16 bg-[#EC3642] text-center">
        <h2 className="text-2xl text-white font-bold">Still have questions?</h2>
        <p className="text-white mt-4">If you didn't find what you were looking for, our customer support team is here to help you with any other questions you may have.</p>
        
        <Link to="/contact-us" className="inline-block mt-6 px-8 py-3 bg-white text-[#EC3642] font-bold rounded-full">
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default FAQPage;
