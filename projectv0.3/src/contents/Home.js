import React, { useState, useEffect } from "react";
import axios from "axios";
import Tapbar from "../components/Tapbar";
import TapbarTeacher from "../components/TapbarTeacher";
import { useUser } from "../App"; // นำเข้า useUser เพื่อดึงข้อมูล user
import { useNavigate } from "react-router-dom";
import apiURL from "../api/api"; 

const Home = () => {
  const { user } = useUser(); // ดึงข้อมูล user
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContent = async () => {
      
      try {
        const response = await axios.get(
          apiURL +"/course_content.php"
        );
        const { content1, content2, goals } = response.data;

        setContent1(content1 || "");
        setContent2(content2 || "");
        setGoals(goals ? JSON.parse(goals) : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      {/* <TapbarTeacher /> */}
      <Tapbar></Tapbar>
      <div className="Description">
        <h2>คำอธิบายรายวิชา</h2>
        <p>{content1}</p>
        <p>{content2}</p>

        <h2>จุดมุ่งหมายรายวิชา</h2>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
