import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Adminbar from "../components/Adminbar";
import apiURL from "../api/api"; 

const EditLab = () => {
  const { lab_id } = useParams(); // Get lab_id from the URL
  const [labName, setLabName] = useState("");
  const [contentFile, setContentFile] = useState(null); // For file input
  const [existingFileName, setExistingFileName] = useState(""); // Display the current file name
  const navigate = useNavigate();

  // Fetch the lab details when the component mounts
  useEffect(() => {
    fetchLabDetails();
  }, []);

  const fetchLabDetails = async () => {
    try {
      const response = await axios.get(
        apiURL +`/insert_labs.php?lab_id=${lab_id}`
      );
      const { lab_name, content_file } = response.data;
      setLabName(lab_name);
      setExistingFileName(content_file);
    } catch (error) {
      console.error("Error fetching lab details:", error);
    }
  };

  const handleFileChange = (e) => {
    setContentFile(e.target.files[0]); // Capture the selected file
  };

  const handleSaveLab = async () => {
    const formData = new FormData();
    formData.append("lab_id", lab_id);
    formData.append("lab_name", labName);

    if (contentFile) {
      // Only append the file if the user selected a new one
      formData.append("content_file", contentFile);
    }

    try {
      const response = await axios.post(
        apiURL +"/update_lab.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data); // Check the full server response

      if (response.data.success) {
        alert("Lab updated successfully!");
        navigate("/admin-lab-editor"); // Redirect to lab list
      } else {
        alert("Error updating lab: " + response.data.error);
      }
    } catch (error) {
      console.error("Error updating lab:", error);
      alert("An error occurred while updating the lab.");
    }
  };

  return (
    <div className="container">
      <Adminbar />
      <h1>แก้ไข LAB</h1>

      <label>ชื่อ LAB:</label>
      <input
        type="text"
        value={labName}
        onChange={(e) => setLabName(e.target.value)}
        required
        className="form-control"
      />
      <br></br>
      <br></br>

      <label>ไฟล์ปัจจุบัน: {existingFileName}</label>
      <br></br>
      <br></br>
      <label>อัพโหลดไฟล์ใหม่ (ไม่บังคับ):</label>
      <input type="file" onChange={handleFileChange} className="form-control" />

      <button onClick={handleSaveLab} className="btn">
        บันทึก
      </button>
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
        label {
          color: #333;
          font-size: 18px;
          text-align: center;
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

export default EditLab;
