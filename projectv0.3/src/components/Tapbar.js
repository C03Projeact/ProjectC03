import React, { useEffect, useState } from "react";
import Tabitems from "./Tabitems";
import { useNavigate } from "react-router-dom";
import { useUser } from "../App"; // นำเข้า useUser จาก context
import axios from "axios"; // นำเข้า axios เพื่อดึงข้อมูล
import apiURL from "../api/api"; 

function Tapbar() {
  const { user, setUser } = useUser(); // ดึง user และ setUser ออกจาก context
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const [chapter, setChapter] = useState(null); // สร้าง state สำหรับเก็บบทเรียนตัวแรก

  useEffect(() => {
    // ฟังก์ชันดึงบทเรียนจาก API
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          apiURL + "/insert_lessons.php"
        );
        const lessons = response.data;

        // เลือกบทเรียนตัวแรกและตั้งค่า chapter
        if (lessons.length > 0) {
          setChapter({
            title: "บทเรียน", // ใช้ lesson_name ของบทเรียนตัวแรก
            link: `/Chapter/${lessons[0].lesson_name}`, // ใช้ lesson_name แทน id ในลิงก์
          });
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons(); // เรียกใช้เมื่อ component mount
  }, []);

  const handleLogout = () => {
    setUser(null); // ลบข้อมูลผู้ใช้
    localStorage.removeItem("token"); // ลบ token หรือข้อมูลจาก localStorage
    navigate("/", { replace: true }); // เปลี่ยนเส้นทางไปหน้า login
  };

  return (
    <div className="Tabbar">
      <img
        src="images/20210202-logoRMUTT-color-01.png"
        className="logo"
        alt="Description of the image"
      />
      <h1 className="barLogin">
        การเขียนโปรแกรมคอมพิวเตอร์
        {user && user.prefix && user.first_name && user.last_name && (
          <div className="nameContainer">
            <span>{user.prefix} </span>
            <span>{user.first_name} </span>
            <span>{user.last_name}</span>
          </div>
        )}
        <h2>Computer Programming Laboratory</h2>
      </h1>
      <nav>
        <ul>
          <Tabitems item="หน้าหลัก" tolink="/home" />
          {/* แสดงเฉพาะบทเรียนตัวแรก */}
          {chapter && <Tabitems key={chapter.title} item={chapter.title} tolink={chapter.link} />}
          
          <Tabitems item="LAB" tolink="/Homework" />
          <Tabitems item="คะแนน" tolink="/score" />
          <Tabitems item="โปรไฟล์" tolink="/Profile" />
          <button className="logout-home" onClick={handleLogout}>
            ออกจากระบบ
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Tapbar;
