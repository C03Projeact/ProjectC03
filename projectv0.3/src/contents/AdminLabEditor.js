import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Adminbar from "../components/Adminbar";
import { useUser } from "../App"; // นำเข้า useUser จาก App.js
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import apiURL from "../api/api"; 

const AdminLabEditor = () => {
  const { user } = useUser(); // ใช้ user จาก context
  const [labs, setLabs] = useState([]);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [goals, setGoals] = useState([""]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchContent();
    fetchLabs();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        apiURL + "/course_content.php"
      );
      const { content1, content2, goals } = response.data;
      setContent1(content1 || "");
      setContent2(content2 || "");
      try {
        setGoals(goals ? JSON.parse(goals) : [""]);
      } catch (error) {
        console.error("Error parsing goals:", error);
        setGoals([""]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveAllContent = () => {
    const data = {
      content1: content1,
      content2: content2,
      goals: goals.filter((goal) => goal.trim() !== ""),
    };

    console.log("Data to send:", data);

    axios
      .put(
        apiURL + "/course_content.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("บันทึกข้อมูลสำเร็จ");
        fetchContent();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleRemoveGoal = async (index) => {
    try {
      const response = await axios.delete(
        apiURL + `/course_content.php?id=${index}`
      );
      console.log(response.data);
      const updatedGoals = goals.filter((_, i) => i !== index);
      setGoals(updatedGoals);
      alert("ลบจุดมุ่งหมายสำเร็จ");
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const fetchLabs = async () => {
    try {
      const response = await axios.get(
        apiURL + "/insert_labs.php"
      );
      console.log("Fetched labs data:", response.data); // ดูข้อมูลที่ได้รับ

      const data = response.data;

      // ตรวจสอบว่า data เป็น Array หรือไม่
      if (Array.isArray(data)) {
        setLabs(data); // ตั้งค่าบทเรียน
      } else {
        console.error("Error: Labs data is not an array", data);
        setLabs([]); // ตั้งเป็นอาร์เรย์ว่าง
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
      setLabs([]); // ตั้งเป็นอาร์เรย์ว่างในกรณีเกิดข้อผิดพลาด
    }
  };


  const handleDeleteLab = async (lab_name) => {
    if (window.confirm("คุณแน่ใจหรือว่าต้องการลบบทเรียนนี้?")) {
      try {
        const response = await axios.delete(
          apiURL + `/insert_labs.php?lab_name=${lab_name}`
        );

        if (response.data.message) {
          alert(response.data.message); // แสดงข้อความถ้ามี
        }

        fetchLabs(); // โหลดข้อมูลใหม่หลังจากลบเสร็จ
        alert("ลบบทเรียนสำเร็จ");
      } catch (error) {
        console.error("Error deleting lab:", error);
      }
    }
  };
  const styles = {
    adminPage: {
      padding: "20px",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    section: {
      marginBottom: "40px",
    },
    sectionTitle: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    tableCell: {
      textAlign: "center",
      verticalAlign: "middle",
    },
    btn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "white",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    },
    btnSuccess: {
      backgroundColor: "#28a745",
      borderColor: "#28a745",
    },
    btnSuccessHover: {
      backgroundColor: "#218838",
    },
    btnDanger: {
      backgroundColor: "#dc3545",
      borderColor: "#dc3545",
    },
    btnDangerHover: {
      backgroundColor: "#c82333",
    },
    icon: {
      marginRight: "8px",
    },
  };
  return (
    <div className="container">
      <Adminbar />
      {/* <h1>คำอธิบายรายวิชา</h1>
      <br></br>
      <h2>เนื้อหาภาษาไทย</h2>
      <br></br>
      <textarea
        value={content1}
        onChange={(e) => setContent1(e.target.value)}
        placeholder="แก้ไขเนื้อหาหลักสูตรภาษาไทยที่นี่..."
        rows="5"
      />
      <h2>เนื้อหาภาษาอังกฤษ</h2>
      <br></br>

      <textarea
        value={content2}
        onChange={(e) => setContent2(e.target.value)}
        placeholder="แก้ไขเนื้อหาหลักสูตรภาษาอังกฤษที่นี่..."
        rows="5"
      />
      <button onClick={() => setGoals([...goals, ""])}>เพิ่มจุดมุ่งหมาย</button>
      <br></br>
      <br></br>
      <h1>จุดมุ่งหมายรายวิชา</h1>
      <br></br>

      {goals.map((goal, index) => (
        <div className="goal-container" key={index}>
          <textarea
            value={goal}
            onChange={(e) => {
              const updatedGoals = [...goals];
              updatedGoals[index] = e.target.value;
              setGoals(updatedGoals);
            }}
            placeholder={`จุดมุ่งหมายที่ ${index + 1}`}
            rows="2"
          />
          <button onClick={() => handleRemoveGoal(index)}>ลบ</button>
        </div>
      ))}
      <button onClick={handleSaveAllContent}>บันทึก</button>
      <br></br>
      <br></br> */}
      <h1>LAB</h1>

      <button onClick={() => navigate("/add-labs")}>เพิ่ม LAB</button>
      <br></br>
      <br></br>
      <table
        className="table table-bordered table-striped"
        style={styles.table}
      >
        <thead>
          <tr>
            <th>ชื่อ LAB</th>
            <th>ไฟล์ LAB</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab, index) => (
            <tr key={lab.lab_id}>
              <td style={styles.tableCell}>{lab.lab_name}</td>
              <td style={styles.tableCell}>
                <a
                  href={apiURL + "/lab_storage/" + lab.content_file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  รายละเอียดเอกสาร
                </a>
              </td>
              <td>
                <Link
                  to={`/edit-labs/${lab.lab_id}`}
                  className="btn btn-success"
                  style={{
                    ...styles.btn,
                    marginRight: "10px",
                    ...styles.btnSuccess,
                  }}
                >
                  <FaEdit style={styles.icon} />
                  แก้ไข
                </Link>
              </td>

              <td style={styles.tableCell}>
                <button
                  onClick={() => handleDeleteLab(lab.lab_name)}
                  className="btn btn-danger"
                  style={{ ...styles.btn, ...styles.btnDanger }}
                >
                  <FaTrashAlt style={styles.icon} />
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .container {
          width: 100%; /* ใช้ความกว้าง 100% */
          padding: 20px;
          padding-left: 280px; /* เพิ่ม padding ซ้ายเพื่อเว้นพื้นที่ */
          background-color: #f9f9f9;
          border-radius: 0; /* ลบขอบเพื่อให้เต็มพื้นที่ */
          box-shadow: none; /* ลบเงา */
          position: relative; /* ช่วยในการจัดตำแหน่ง */
          
        }

        h1 {
          color: #333;
          font-size: 2em; /* เพิ่มขนาดตัวอักษร */
          font-weight: bold; /* ทำให้ตัวอักษรหนา */
        }

        h2 {
          font-size: 18px; /* เพิ่มขนาดตัวอักษร */

          color: #333;
        }

        textarea {
          width: calc(100% - 20px); /* ลดขนาดให้เล็กกว่าพื้นหลัง */
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          margin-bottom: 10px;
          resize: none;
          font-size: 16px;
        }

        button {
          padding: 10px 15px;
          margin-top: 1px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #0056b3;
        }

        .goal-container {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .goal-container button {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminLabEditor;
