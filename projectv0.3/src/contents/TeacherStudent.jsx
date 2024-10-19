import React, { useState, useEffect } from "react";
import { useUser } from "../App"; // นำเข้า useUser จาก App.js
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Adminbar from "../components/Adminbar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminItems from "../components/AdminItems";
import TapbarTeacher from "../components/TapbarTeacher";
import apiURL from "../api/api"; 

const TeacherStudent = () => {

  const { user } = useUser(); // ใช้ user จาก context
  const [accounts, setAccounts] = useState({
    admin: [],
    teacher: [],
    student: [],
  });
  const [showOptions, setShowOptions] = useState(false); // State for toggling options
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        apiURL +"/show_account.php"
      );
      const data = response.data;
      const adminAccounts = data.filter((account) => account.role === "1");
      const teacherAccounts = data.filter((account) => account.role === "2");
      const studentAccounts = data.filter((account) => account.role === "3");
      setAccounts({
        admin: adminAccounts,
        teacher: teacherAccounts,
        student: studentAccounts,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("ไม่สามารถดึงข้อมูลได้");
    }
  };

  const deleteUser = (id, user_id) => {
    if (
      window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลบัญชี ${user_id} นี้?`)
    ) {
      axios
        .delete(
          apiURL +`/show_account.php/${id}`
        )
        .then(function (response) {
          console.log(response.data);
          fetchData(); // Refresh the data after deletion
        })
        .catch(function (error) {
          console.error("Error deleting user: ", error);
        });
    }
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const formattedHours = hours % 12 || 12; // แปลงชั่วโมงให้เป็น 12 ชั่วโมง
    const amPm = hours < 12 ? "AM" : "PM"; // กำหนด AM/PM
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`; // คืนค่าในรูปแบบที่ต้องการ
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
    <div className="teacher-main-content">
      <div>
        <TapbarTeacher></TapbarTeacher>
        <ul
          className={
            showOptions ? "admin-options active" : "admin-options-user"
          }
        >
          <AdminItems
            tolink="/teacher-adduser-student"
            item="เพิ่มบัญชีผู้ใช้งาน"
          />
        </ul>
      </div>
      <br></br>
      <div>
        <h2>บัญชีนักศึกษา</h2>
        <br></br>
        <table
          className="table table-bordered table-striped"
          style={styles.table}
        >
          <thead>
            <tr>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>คณะ</th>
              <th>ภาควิชา</th>
              <th>กลุ่มเรียน</th>
              <th>วัน</th>
              <th>เวลาเรียน</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {accounts.student.map((account, index) => (
              <tr key={`student_${index}`}>
                <td style={styles.tableCell}>{account.user_id}</td>
                <td style={styles.tableCell}>
                  {account.prefix}
                  {account.first_name}
                </td>
                <td style={styles.tableCell}>{account.last_name}</td>

                <td style={styles.tableCell}>{account.faculty}</td>
                <td style={styles.tableCell}>{account.department}</td>
                <td style={styles.tableCell}>{account.section}</td>
                <td style={styles.tableCell}>{account.day}</td>
                <td style={styles.tableCell}>
                  {formatTime(account.start_time)} -{" "}
                  {formatTime(account.end_time)}
                </td>
                <td style={styles.tableCell}>
                  <Link
                    to={`/user/teacherstudent/${account.id}/edit`}
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
                    onClick={() => deleteUser(account.id, account.user_id)}
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
      </div>
    </div>
  );
};

export default TeacherStudent;
