// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveDataInLocalStorage,
  STORAGE_USER_KEY,
} from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    saveDataInLocalStorage(STORAGE_USER_KEY, userData);
  };

  // Function to log out the user
  const logout = async () => {
    // cookies.get(authToken) =
    await axios.post(
      "https://boxima-backend.vercel.app/api/users/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    removeDataFromLocalStorage(STORAGE_USER_KEY);
  };

  // Check if user is already logged in when the app loads
  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     try {
  //       const response = await axios.get('https://boxima-backend.vercel.app/api/user/get', { withCredentials: true });
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error('User not authenticated:', error);
  //     }
  //   };
  //   checkUserLoggedIn();
  // }, []);

  useEffect(() => {
    const userDetails = getDataFromLocalStorage(STORAGE_USER_KEY);
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
