import React, { useEffect, useState } from "react";
import TapbarTeacher from "../../components/TapbarTeacher";
import NavbarTeacher from "../../components/NavbarTeacher"; // เปลี่ยนชื่อที่นำเข้า
import { useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../api/api"; 

 function ChapterTeacher() {
  const { lesson_name } = useParams(); // ดึง lesson_name จาก URL
  const [lessonData, setLessonData] = useState(null); // สร้าง state สำหรับเก็บข้อมูลบทเรียน
  const [loading, setLoading] = useState(true); // สร้าง state สำหรับแสดง loading

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          apiURL + "/insert_lessons.php"
        );
        const lessons = response.data;

        // ค้นหาบทเรียนตาม lesson_name
        const lesson = lessons.find((l) => l.lesson_name === lesson_name);
        setLessonData(lesson); // เก็บข้อมูลบทเรียน
        setLoading(false); // ปิด loading
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLoading(false); // ปิด loading แม้เกิดข้อผิดพลาด
      }
    };

    fetchLesson(); // เรียกเมื่อ component mount
  }, [lesson_name]); // รันทุกครั้งที่ lesson_name เปลี่ยนแปลง

  if (loading) {
    return <div>Loading...</div>; // แสดง loading ขณะรอดึงข้อมูล
  }

  if (!lessonData) {
    return <div>ไม่พบข้อมูลบทเรียน</div>; // กรณีไม่พบบทเรียน
  }

  return (
    <div>
      <TapbarTeacher />
      <NavbarTeacher />
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "150px auto 0",
          marginLeft: "120px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          {lessonData.lesson_name}
        </div>
        <div style={{ fontSize: "16px", lineHeight: "1.5" }}>
          {lessonData.content_file ? (
            <iframe
              src={apiURL + `/lesson_storage/${lessonData.content_file}`}
              width="100%"
              height="700px"
              title="PDF Viewer"
            />
          ) : (
            <p>ไม่พบไฟล์เนื้อหาของบทเรียนนี้</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ChapterTeacher;

