import React, { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import token from "../api/token";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const encryptedData = localStorage.getItem("user");
    if (encryptedData) {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, token);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        setUser(decryptedData);
      } catch (error) {
        console.error("Failed to decrypt user data:", error);
      }
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), token).toString();
    localStorage.setItem("user", encryptedData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
