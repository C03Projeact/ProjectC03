import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import apiURL from "../api/api";
import token from "../api/token";
import { useUser } from "../App"; // Import useUser เพื่อใช้ setUser

function Login() {
  const { setUser } = useUser(); // ใช้ setUser จาก context
  const [credentials, setCredentials] = useState({
    user_id: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("user_id", credentials.user_id);
    formData.append("password", credentials.password);
  
    axios
      .post(apiURL + "/check_login.php", formData)
      .then((response) => {
        console.log("Login response:", response.data);
        if (response.data.status === "Success") {
          const userRole = parseInt(response.data.user.role);
  
          // Encrypt the response data
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(response.data),
            token
          ).toString();
  
          // Save to local storage
          localStorage.setItem("user", encryptedData);
  
          // Decrypt the data
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, token);
          const decryptedData = JSON.parse(
            decryptedBytes.toString(CryptoJS.enc.Utf8)
          );
  
          console.log("Decrypted Data:", decryptedData);
  
          // Set user data in context
          setUser(decryptedData.user); // เก็บเฉพาะข้อมูลผู้ใช้
  
          // Navigate based on user role
          if (userRole === 1) {
            navigate("/admin");
          } else if (userRole === 2) {
            navigate("/hometeacher", { state: { role: userRole } });
          } else if (userRole === 3) {
            navigate("/home", { state: { role: userRole } });
          } else {
            setErrorMessage("Unknown user role");
          }
        } else {
          setErrorMessage("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };
  
  // Inline styles for the components
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "100px auto",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#555",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#007BFF",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007BFF",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorMessage: {
      color: "red",
      fontSize: "12px",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="user_id">
            บัญชีผู้ใช้งาน:
          </label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">
            รหัสผ่าน:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
