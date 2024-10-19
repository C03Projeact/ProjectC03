import React, { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";
import Adminbar from "../components/Adminbar";
import { useNavigate } from "react-router-dom";
import apiURL from "../api/api"; 

function AdminAddUserAdmin() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [displayMode, setDisplayMode] = useState("admin"); // Set default display mode to "admin"
  const [csvData, setCsvData] = useState([]); // State for storing CSV data
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "user_id") {
      value = value.slice(0, 14);
    }

    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleInputChangeAdmin = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

 

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!inputs.user_id || inputs.user_id.length > 50) {
      errors.user_id = (
        <span style={{ color: "red" }}>กรุณากรอกข้อมูลไม่เกิน 50 ตัวอักษร</span>
      );
    }

    for (const field of ["prefix", "first_name", "last_name"]) {
      if (!inputs[field]) {
        errors[field] = <span style={{ color: "red" }}>กรุณากรอกข้อมูล</span>;
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setGlobalError("");
      return;
    }

    const userDataWithRoleAndPassword = {
      ...inputs,
      role: 1,
      password: inputs.password, // assuming you have a password field for admin
    };

    axios
      .post(
        apiURL + "/add_user.php",
        JSON.stringify(userDataWithRoleAndPassword),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Form data successfully submitted!", response.data);
        clearForm();
        console.log("Navigating to /admin"); // เพิ่ม log เพื่อตรวจสอบ
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setGlobalError("เกิดข้อผิดพลาดในการส่งข้อมูล");
      });
  };

  const clearForm = () => {
    setInputs({});
    setErrors({});
    setGlobalError("");
    setCsvData([]);
  };

  const renderAdminAddUserAdminForm = () => {
    return (
      <div className="main-content-user">
        <Adminbar />
        <div className="addUser">
          <h1>เพิ่มบัญชีผู้ดูแลระบบ</h1>
          <form onSubmit={handleAdminSubmit}>
            {globalError && <p className="error">{globalError}</p>}
            <div className="form-group">
              <label htmlFor="user_id">บัญชีผู้ดูแลระบบ:</label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                maxLength="50"
                onChange={handleInputChangeAdmin}
              />
              {errors.user_id && <p className="error">{errors.user_id}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChangeAdmin}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">คำนำหน้า:</label>
              <input
                type="text"
                id="prefix"
                name="prefix"
                onChange={handleInputChangeAdmin}
              />
              {errors.prefix && <p className="error">{errors.prefix}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="first_name">ชื่อ:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleInputChangeAdmin}
              />
              {errors.first_name && (
                <p className="error">{errors.first_name}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">นามสกุล:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={handleInputChangeAdmin}
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
            <button type="submit">เพิ่มข้อมูล </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="main-content">
      <div className="displayModeButtons"></div>
      {displayMode === "admin" ? renderAdminAddUserAdminForm() : null}
    </div>
  );
}

export default AdminAddUserAdmin;
