import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Adminbar from "../components/Adminbar";
import { useUser } from "../App"; // นำเข้า useUser จาก App.js
import TapbarTeacher from "../components/TapbarTeacher";
import apiURL from "../api/api"; 

export default function EditUserStudent() {
  const { user } = useUser(); // ใช้ user จาก context
  const navigate = useNavigate(); // Correctly invoke the useNavigate hook
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(apiURL +`/show_account.php/${id}`)
      .then(function (response) {
        console.log(response.data);
        setInputs(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data: ", error);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ตรวจสอบว่ามีการกรอกรหัสผ่านใหม่หรือไม่
    if (!inputs.password) {
      alert("กรุณากรอกรหัสผ่านใหม่ก่อนทำการบันทึก");
      return; // หยุดการทำงานถ้าไม่มีการกรอกรหัสผ่านใหม่
    }

    // ส่งข้อมูลไปยัง backend
    axios
      .put(
        apiURL +`/show_account.php/${id}/edit`,
        inputs
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/teacher-student");
      })
      .catch(function (error) {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="teacher-main-content">
      <TapbarTeacher />
      <br></br>
      <br></br>
      <br></br>
      <div className="TeacherAddUser">
        <h1>แก้ไขข้อมูลนักศึกษา</h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Corrected form element */}
          <div className="form-group">
            <label htmlFor="user_id">บัญชีนักศึกษา:</label>
            <input
              type="text"
              value={inputs.user_id}
              // className="form-control"
              name="user_id"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">รหัสผ่านใหม่:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              style={styles.input}
              required // บังคับให้ต้องกรอก
            />
          </div>
          <div className="form-group">
            <label htmlFor="prefix">คำนำหน้า:</label>
            <input
              type="text"
              value={inputs.prefix}
              // className="form-control"
              name="prefix"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">ชื่อ:</label>
            <input
              type="text"
              value={inputs.first_name}
              // className="form-control"
              name="first_name"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">นามสกุล:</label>
            <input
              type="text"
              value={inputs.last_name}
              // className="form-control"
              name="last_name"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="faculty">คณะ:</label>
            <input
              type="text"
              value={inputs.faculty}
              // className="form-control"
              name="faculty"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label tmlFor="department">ภาควิชา:</label>
            <input
              type="text"
              value={inputs.department}
              // className="form-control"
              name="department"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="section">กลุ่มเรียน:</label>
            <input
              type="text"
              value={inputs.section}
              // className="form-control"
              name="section"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="day">วันเรียน:</label>
            <select
              id="day"
              name="day"
              value={inputs.day || ""}
              onChange={handleChange} // ใช้ handleChange เดิม
              // className="form-control" // เพิ่ม class เพื่อให้มีสไตล์เดียวกัน
              style={styles.input} // หากต้องการสไตล์แบบเดียวกัน
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
          </div>
          <div className="form-group">
            <label htmlFor="start_time">เวลาเริ่มเรียน:</label>
            <input
              type="time"
              value={inputs.start_time}
              // className="form-control"
              name="start_time"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">เวลวสิ้นสุดการเรียน:</label>
            <input
              type="time"
              value={inputs.end_time}
              // className="form-control"
              name="end_time"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" name="update">
            บันทึก
          </button>
        </form>
      </div>
      <div className="col-2"></div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "60%",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    alignSelf: "center",
    width: "100px",
  },
};
