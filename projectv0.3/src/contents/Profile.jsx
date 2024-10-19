import React, { useEffect, useState } from "react";
import { useUser } from "../App";
import Tapbar from "../components/Tapbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiURL from "../api/api"; 

function Profile() {
  const { user } = useUser(); // ใช้ user จาก context
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(apiURL +"/show_account.php")
        .then((response) => {
          console.log("Response data:", response.data); // ตรวจสอบข้อมูลทั้งหมดจาก API
          console.log("User section:", user.section); // ตรวจสอบค่า section ของ user

          // แปลงค่า section เป็น string และตรวจสอบการเปรียบเทียบ
          const teacherList = response.data.filter((teacher) => {
            console.log(
              `Checking teacher: ${teacher.first_name} ${teacher.last_name}, role: ${teacher.role}, section: ${teacher.section}`
            );
            return (
              teacher.role === "2" &&
              String(teacher.section).trim() === String(user.section).trim()
            );
          });

          console.log("Filtered teachers:", teacherList); // ตรวจสอบรายชื่ออาจารย์ที่ผ่านการกรอง
          setTeachers(teacherList);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // เพิ่ม Loading กรณี user ยังไม่ถูกโหลด
  }

  return (
    <div>
      <Tapbar />

      <div className="Profile">
        <h1>ข้อมูลนักศึกษา</h1>
        <div className="Data">
          {/* ข้อมูลนักศึกษา */}
          <div className="Data-name">
            <p>ชื่อ - นามสกุล</p>
            <p>
              {user.prefix} {user.first_name} {user.last_name}
            </p>
          </div>
          <div className="Data-ID">
            <p>นักศึกษาภาควิชา</p>
            <p>{user.user_id}</p>
          </div>
          <div className="Data-faculty">
            <p>คณะ</p>
            <p>{user.faculty}</p>
          </div>
          <div className="Data-department">
            <p>ภาควิชา</p>
            <p>{user.department}</p>
          </div>
          <div className="Data-Time">
            <p>เวลาเรียน</p>
            {/* ตัดเวลาที่โชว์แค่ HH:MM */}
            <p>
              {user.start_time.slice(0, 5)} น. - {user.end_time.slice(0, 5)} น.
            </p>
          </div>

          <div className="Data-group">
            <p>กลุ่มเรียน</p>
            <p>{user.section}</p>
          </div>

          {/* ข้อมูลอาจารย์ผู้สอน */}
          <div className="Data-teacher">
            <p>อาจารย์ผู้สอน</p>
            <p>
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <span key={index}>
                    {teacher.prefix} {teacher.first_name} {teacher.last_name}
                    {index !== teachers.length - 1 && <br />}{" "}
                    {/* เว้นบรรทัดถ้ามีหลายคน */}
                  </span>
                ))
              ) : (
                <span>ไม่มีข้อมูลอาจารย์</span> // กรณีไม่มีข้อมูล
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
