import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminbar from "../components/Adminbar";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import { useUser } from "../App"; // นำเข้า useUser จาก App.js
import apiURL from "../api/api";

const AddLab = () => {
  const { user } = useUser(); // ใช้ user จาก context
  const [labName, setLabName] = useState("");
  const [contentFile, setContentFile] = useState(null);
  const [labs, setLabs] = useState([]);
  const status = 1; // ตั้งค่า status เป็น 1 อัตโนมัติ
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleFileChange = (event) => {
    setContentFile(event.target.files[0]);
  };
  useEffect(() => {
    
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("lab_name", labName);
    formData.append("content_file", contentFile);
    formData.append("status", status); // ใช้ค่าที่ตั้งไว้

    try {
      const response = await axios.post(
        apiURL + "/insert_labs.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      fetchLabs(); // เรียกใช้ฟังก์ชันดึงข้อมูลหลังจากเพิ่มบทเรียน

      // หลังจากเพิ่มเสร็จแล้วให้กลับไปที่หน้า AdminContentEditor
      navigate("/admin-lab-editor");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ฟังก์ชันดึงข้อมูลจากฐานข้อมูล
  const fetchLabs = async () => {
    try {
      const response = await axios.get(
        apiURL + "/show_labs.php"
      );
      setLabs(response.data);
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
  };

  useEffect(() => {
    fetchLabs(); // เรียกใช้ฟังก์ชันเมื่อคอมโพเนนต์โหลด
  }, []);

  return (
    <div className="container">
      <Adminbar />
      <h1>เพิ่ม LAB</h1>
      <br />
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>ชื่อบทเรียน:</label>
          <input
            type="text"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>ไฟล์เนื้อหา:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">
          เพิ่มบทเรียน
        </button>
      </form>
      <style jsx>{`
        .container {
          min-height: 100vh; /* ทำให้ความสูงขั้นต่ำเท่ากับความสูงของหน้าจอ */
          padding: 20px;
          padding-left: 280px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        h1 {
          color: #333;
          font-size: 2em;
          font-weight: bold;
          text-align: center;
        }

        .form {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .form-control {
          width: 95%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s;
        }

        .form-control:focus {
          border-color: #007bff;
          outline: none;
        }

        .btn {
          padding: 10px 15px;
          margin-top: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AddLab;
