import React, { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";
import Adminbar from "../components/Adminbar";
import { useNavigate } from "react-router-dom";
import apiURL from "../api/api"; 

function AdminAddUserTeacher() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [displayMode, setDisplayMode] = useState("teacher"); // Set default display mode to "admin"
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

  const handleInputChangeTeacher = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!inputs.user_id || inputs.user_id.length !== 13) {
      errors.user_id = (
        <span style={{ color: "red" }}>รหัสนักศึกษาไม่ครบ 13 หลัก</span>
      );
    }

    for (const field of [
      "prefix",
      "first_name",
      "last_name",
      "faculty",
      "department",
      "section",
      "password",
      "day",
      "start_time",
      "end_time",
    ]) {
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
      role: 3,
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
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setGlobalError("เกิดข้อผิดพลาดในการส่งข้อมูล");
      });
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setGlobalError("เกิดข้อผิดพลาดในการส่งข้อมูล");
      });
  };

  const handleTeacherSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!inputs.user_id || inputs.user_id.length > 50) {
      errors.user_id = (
        <span style={{ color: "red" }}>กรุณากรอกข้อมูลไม่เกิน 50 ตัวอักษร</span>
      );
    }

    for (const field of [
      "prefix",
      "first_name",
      "last_name",
      "department",
      "position",
      "section",
    ]) {
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
      role: 2, // ใช้ 2 แทนบทบาทของอาจารย์
      password: inputs.password,
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
        console.log("Navigating to /admin-teacher"); // เพิ่ม log เพื่อตรวจสอบ
        navigate("/admin-teacher"); // Redirect to the admin-teacher page after successful submission
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setGlobalError("เกิดข้อผิดพลาดในการส่งข้อมูล");
      });
  };

  const handleFileUpload = (data) => {
    setCsvData(data.slice(1)); // Store the CSV data excluding the header row
  };

  const handleCsvSubmit = () => {
    // Submit the CSV data
    csvData.forEach((row) => {
      const userData = {
        user_id: row[1],
        password: row[2],
        prefix: row[3],
        first_name: row[4],
        last_name: row[5],
        faculty: row[6],
        department: row[7],
        section: row[8],
        day: row[9],
        start_time: row[10],
        end_time: row[11],
        role: 3,
      };

      // Call your API to submit user data
      axios
        .post(
          apiURL + "/add_user.php",
          JSON.stringify(userData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Form data successfully submitted!", response.data);
          // Clear inputs after successful submission
          clearForm();
          window.location.reload();
          // Clear the CSV data after submission
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          // Optionally, handle errors
        });
    });
  };

  const clearForm = () => {
    setInputs({});
    setErrors({});
    setGlobalError("");
    setCsvData([]);
  };

  const handleDisplayChange = (mode) => {
    setDisplayMode(mode);
  };

  const renderAdminAddUserStudentForm = () => {
    return (
      <div className="main-content-user">
        <Adminbar />
        <div className="addUser">
          <h1>เพิ่มบัญชีนักศึกษา</h1>
          <form onSubmit={handleStudentSubmit}>
            {globalError && <p className="error">{globalError}</p>}
            <div className="form-group">
              <label htmlFor="user_id">บัญชีนักศึกษา:</label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                maxLength="14"
                onChange={handleInputChange}
              />
              {errors.user_id && <p className="error">{errors.user_id}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">คำนำหน้า:</label>
              <input
                type="text"
                id="prefix"
                name="prefix"
                onChange={handleInputChange}
              />
              {errors.prefix && <p className="error">{errors.prefix}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="first_name">ชื่อ:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="faculty">คณะ:</label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                onChange={handleInputChange}
              />
              {errors.faculty && <p className="error">{errors.faculty}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="department">ภาควิชา:</label>
              <input
                type="text"
                id="department"
                name="department"
                onChange={handleInputChange}
              />
              {errors.department && (
                <p className="error">{errors.department}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="section">กลุ่มเรียน:</label>
              <input
                type="text"
                id="section"
                name="section"
                onChange={handleInputChange}
              />
              {errors.section && <p className="error">{errors.section}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="day">วัน:</label>
              <select
                id="day"
                name="day"
                value={inputs.day || ""}
                onChange={handleInputChange}
              >
                <option value="">-- เลือกวัน --</option>
                <option value="จันทร์">จันทร์</option>
                <option value="อังคาร">อังคาร</option>
                <option value="พุธ">พุธ</option>
                <option value="พฤหัสบดี">พฤหัสบดี</option>
                <option value="ศุกร์">ศุกร์</option>
                <option value="เสาร์">เสาร์</option>
                <option value="อาทิตย์">อาทิตย์</option>
              </select>
              {errors.day && <span style={{ color: "red" }}>{errors.day}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="start_time">เวลาเริ่มเรียน:</label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                onChange={handleInputChange}
              />
              {errors.start_time && (
                <p className="error">{errors.start_time}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="end_time">เวลาสิ้นสุดการเรียน:</label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                onChange={handleInputChange}
              />
              {errors.end_time && <p className="error">{errors.end_time}</p>}
            </div>
            <button type="submit">เพิ่มข้อมูล</button>
          </form>
        </div>
      </div>
    );
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
            <button type="submit">เพิ่มข้อมูล</button>
          </form>
        </div>
      </div>
    );
  };

  const renderAdminAddUserTheacherForm = () => {
    return (
      <div className="main-content-user">
        <Adminbar />
        <div className="addUser">
          <h1>เพิ่มบัญชีอาจารย์</h1>
          <form onSubmit={handleTeacherSubmit}>
            {globalError && <p className="error">{globalError}</p>}
            <div className="form-group">
              <label htmlFor="user_id">บัญชีอาจารย์:</label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                maxLength="50"
                onChange={handleInputChangeTeacher}
              />
              {errors.user_id && <p className="error">{errors.user_id}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChangeTeacher}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">คำนำหน้า:</label>
              <input
                type="text"
                id="prefix"
                name="prefix"
                onChange={handleInputChangeTeacher}
              />
              {errors.prefix && <p className="error">{errors.prefix}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="first_name">ชื่อ:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleInputChangeTeacher}
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
                onChange={handleInputChangeTeacher}
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="department">อาจาร์ภาควิชา:</label>
              <input
                type="text"
                id="department"
                name="department"
                onChange={handleInputChange}
              />
              {errors.department && (
                <p className="error">{errors.department}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="department">ตำแหน่ง:</label>
              <input
                type="text"
                id="position"
                name="position"
                onChange={handleInputChange}
              />
              {errors.position && <p className="error">{errors.position}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="section">กลุ่มสอน:</label>
              <input
                type="text"
                id="section"
                name="section"
                onChange={handleInputChange}
              />
              {errors.section && <p className="error">{errors.section}</p>}
            </div>
            <button type="submit">เพิ่มข้อมูล</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="main-content">
      <div className="displayModeButtons">
        {/* <button onClick={() => handleDisplayChange("admin")}>
          บัญชีผู้ดูแลระบบ
        </button>
        <button onClick={() => handleDisplayChange("teacher")}>
          บัญชีอาจารย์
        </button>
        <button onClick={() => handleDisplayChange("student")}>
          บัญชีนักศึกษา
        </button>
        <button onClick={() => handleDisplayChange("studentCSV")}>
          เพิ่มบัญชีนักศึกษาผ่าน CSV ไฟล์
        </button> */}
      </div>
      {/* {displayMode === "admin" ? renderAdminAddUserAdminForm() : null} */}
      {displayMode === "teacher" ? renderAdminAddUserTheacherForm() : null}
      {/* {displayMode === "student" ? renderAdminAddUserStudentForm() : null} */}
      {/* {displayMode === "studentCSV" ? (
        <div className="main-content-user">
          <Adminbar />
          <div className="addUser">
            <h1> เพิ่มบัญชีนักศึกษาผ่าน CSV ไฟล์</h1>
            <CSVReader onFileLoaded={handleFileUpload} header={true} />
            <button onClick={handleCsvSubmit} disabled={csvData.length === 0}>
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}

export default AdminAddUserTeacher;
