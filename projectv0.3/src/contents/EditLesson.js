import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Adminbar from "../components/Adminbar";
import apiURL from "../api/api"; 

const EditLesson = () => {
  const { lesson_id } = useParams(); // Get lesson_id from the URL
  const [lessonName, setLessonName] = useState("");
  const [contentFile, setContentFile] = useState(null); // For file input
  const [existingFileName, setExistingFileName] = useState(""); // Display the current file name
  const navigate = useNavigate();

  // Fetch the lesson details when the component mounts
  useEffect(() => {
    fetchLessonDetails();
  }, []);

  const fetchLessonDetails = async () => {
    try {
      const response = await axios.get(
        apiURL +`/insert_lessons.php?lesson_id=${lesson_id}`
      );
      const { lesson_name, content_file } = response.data;
      setLessonName(lesson_name);
      setExistingFileName(content_file);
    } catch (error) {
      console.error("Error fetching lesson details:", error);
    }
  };

  const handleFileChange = (e) => {
    setContentFile(e.target.files[0]); // Capture the selected file
  };

  const handleSaveLesson = async () => {
    const formData = new FormData();
    formData.append("lesson_id", lesson_id);
    formData.append("lesson_name", lessonName);

    if (contentFile) {
      // Only append the file if the user selected a new one
      formData.append("content_file", contentFile);
    }

    try {
      const response = await axios.post(
        apiURL +"/update_lesson.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data); // Check the full server response

      if (response.data.success) {
        alert("Lesson updated successfully!");
        navigate("/admin-content-editor"); // Redirect to lesson list
      } else {
        alert("Error updating lesson: " + response.data.error);
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      alert("An error occurred while updating the lesson.");
    }
  };

  return (
    <div className="container">
      <Adminbar />
      <h1>แก้ไขบทเรียน</h1>
      <label>ชื่อบทเรียน:</label>
      <input
        type="text"
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
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

      <button onClick={handleSaveLesson} className="btn">
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

export default EditLesson;
