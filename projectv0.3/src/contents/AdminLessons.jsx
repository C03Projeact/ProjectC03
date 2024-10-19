import React, { useState, useEffect } from "react";
import axios from "axios";
import apiURL from "../api/api";

function AdminLessons() {
  const [lessonName, setLessonName] = useState("");
  const [contentFile, setContentFile] = useState("");
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonCount, setLessonCount] = useState(0);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        apiURL + "/show_lessons.php"
      );
      setLessons(response.data);
      setLessonCount(response.data.length);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่าชื่อบทเรียนที่ใส่ซ้ำกับชื่อบทเรียนที่มีอยู่หรือไม่
    const isDuplicate = lessons.some(
      (lesson) => lesson.lesson_name === lessonName
    );
    if (isDuplicate) {
      console.error("Lesson name already exists.");
      return; // หยุดการทำงานของฟังก์ชันถ้าชื่อซ้ำกัน
    }

    const formData = new FormData();
    formData.append("lesson_name", lessonName);
    formData.append("content_file", contentFile);
    formData.append("status", 1);

    try {
      const response = await axios.post(
        apiURL + "/insert_lessons.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data inserted successfully.", response.data);
      fetchLessons();
      setLessonName("");
      setContentFile("");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setLessonName(lesson.lesson_name);
    setContentFile(lesson.content_file);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lesson_id", selectedLesson.id);
    formData.append("lesson_name", lessonName);
    formData.append("content_file", contentFile);
    formData.append("status", 1);

    try {
      const response = await axios.post(
        apiURL + "/update_lesson.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data updated successfully.", response.data);
      fetchLessons();
      setSelectedLesson(null);
      setLessonName("");
      setContentFile("");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(
        apiURL + `/delete_lesson.php?id=${lessonId}`
      );
      console.log("Data deleted successfully.", response.data);
      fetchLessons();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // สร้างตัวเลือกของตัวเลข 1-20 และเรียงลำดับจากน้อยไปมาก
  const lessonNumbers = Array.from(
    { length: 20 },
    (_, index) => index + 1
  ).sort((a, b) => a - b);

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* เลือกตัวเลขของบทเรียน */}
        <select
          value={selectedLesson ? selectedLesson.id : ""}
          onChange={(e) =>
            handleEditLesson(
              lessons.find((lesson) => lesson.id === parseInt(e.target.value))
            )
          }
        >
          <option value="">กรุณาเลือกบทเรียน</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.lesson_name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setContentFile(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Lessons</h2>
      <table>
        <thead>
          <tr>
            <th>Lesson Name</th>
            <th>Content File</th>
            <th>Upload Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, index) => (
            <tr key={index}>
              <td>{lesson.lesson_name}</td>
              <td>{lesson.content_file}</td>
              <td>{lesson.upload_time}</td>
              <td>
                <button onClick={() => handleEditLesson(lesson)}>Edit</button>
                <button onClick={() => handleDeleteLesson(lesson.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedLesson && (
        <div>
          <h2>Edit Lesson</h2>
          <form onSubmit={handleUpdateLesson}>
            <input
              type="text"
              placeholder="Lesson Name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setContentFile(e.target.files[0])}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminLessons;
