import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useToastify } from "../hooks/useToastify";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    otp: "",
  });
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear errors when switching forms
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { showSuccessToast, showErrorToast } = useToastify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        if (otpSent) {
          // Reset password with OTP
          const response = await axios.post(
            "https://boxima-backend.vercel.app/api/users/reset-password",
            {
              email: formData.email,
              otp: formData.otp,
              newPassword: formData.password,
            }
          );
          alert(response.data.message);
          setIsForgotPassword(false); // Return to login after password reset
          setOtpSent(false); // Reset OTP status
        } else {
          // Send OTP to email
          const response = await axios.post(
            "https://boxima-backend.vercel.app/api/users/forgot-password",
            { email: formData.email }
          );
          setOtpSent(true);
          alert(response.data.message); // Notify user that OTP is sent
        }
      } else if (isLogin) {
        // Login Request
        const response = await axios.post(
          "https://boxima-backend.vercel.app/api/users/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true } // Include cookies
        );

        const { data, message } = response.data;
        showSuccessToast(message);
        login(data); // Update user state
        navigate("/"); // Redirect to homepage
      } else {
        // Signup Request
        const response = await axios.post(
          "https://boxima-backend.vercel.app/api/users/register",
          {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
          }
        );

        const { data } = response.data;
        login(data); // Update user state
        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      console.log("Authentication error:", error.response.data.message);
      showErrorToast(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[url('/assets/3.jpg')] bg-cover bg-center">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-2xl m-4 sm:m-6 lg:m-0">
        <h2 className="text-center text-2xl font-bold mb-6">
          {isForgotPassword
            ? otpSent
              ? "Reset Password"
              : "Forgot Password"
            : isLogin
            ? "Login"
            : "Sign Up"}
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && !isForgotPassword && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
            required
          />
          {!isForgotPassword && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-6 p-2 border border-gray-300 rounded"
              onChange={handleInputChange}
              required
            />
          )}
          {isForgotPassword && otpSent && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-[#EC3642] text-white rounded transition hover:bg-[#d52b3d]"
          >
            {isForgotPassword
              ? otpSent
                ? "Reset Password"
                : "Send OTP"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        {!isForgotPassword && (
          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button className="text-[#EC3642]" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        )}
        {isLogin && !isForgotPassword && (
          <p className="text-center mt-2">
            <button
              className="text-[#EC3642]"
              onClick={() => {
                setIsForgotPassword(true);
                setOtpSent(false);
              }}
            >
              Forgot Password?
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
