import React from "react";
import "./app.css";
import ProductList from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import MenCategory from "./components/MenCategory";
import WomenCategory from "./components/WomenCategory";
import LoginSignup from "./components/LoginSignup";
import { Provider } from "react-redux";
import store from "./redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQPage from "./components/FAQPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";

const MainContent = () => {
  const location = useLocation();

  const isPolicyPage =
    location.pathname === "/privacy-policy" || location.pathname === "/terms";

  return (
    <main
      className={`flex-grow ${
        !isPolicyPage ? "bg-[#1D1D1D]" : ""
      } sm:pt-12 md:pt-20 lg:pt-40`}
    >
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/men-category" element={<MenCategory />} />
        <Route path="/women-category" element={<WomenCategory />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </main>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <MainContent />
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
