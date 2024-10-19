import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Adminbar from "../components/Adminbar";
import { useUser } from "../App"; // นำเข้า useUser จาก App.js
import apiURL from "../api/api"; 

export default function EditUserTeacher() {
  const { user } = useUser(); // ใช้ user จาก context
  const navigate = useNavigate(); // Corrected useNavigate
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
        navigate("/admin-teacher");
      })
      .catch(function (error) {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="main-content">
      <Adminbar />
      <div className="addUser">
        <h1>แก้ไขข้อมูลอาจารย์</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_id">บัญชีอาจารย์: </label>
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
            <label htmlFor="department">อาจาร์ภาควิชา:</label>
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
            <label htmlFor="department">ตำแหน่ง:</label>
            <input
              type="text"
              value={inputs.position}
              // className="form-control"
              name="position"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="section">กลุ่มที่สอน:</label>
            <input
              type="text"
              value={inputs.section}
              className="form-control"
              name="section"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" name="update">
            บันทึก
          </button>
        </form>
      </div>
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
