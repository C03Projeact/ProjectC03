import React, { useEffect } from "react";
import TapbarTeacher from "../components/TapbarTeacher";
import { useUser } from "../App";
import { useNavigate } from "react-router-dom";
import apiURL from "../api/api"; 

function ProfileTeacher() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <TapbarTeacher></TapbarTeacher>

      <div className="Profile">
        <h1>ข้อมูลอาจารย์</h1>
        <div className="Data">
          <div className="Data-name">
            <p>ชื่อ - นามสกุล</p>
            <br></br>
            <p>
              {user.prefix} {user.first_name} {user.last_name}
            </p>
          </div>
          <div className="Data-ID">
            <p>อาจารย์ภาควิชา</p>
            <br></br>
            <p>{user.department}</p>
          </div>
          <div className="Data-faculty">
            <p>อาจารย์ภาควิชา</p>
            <br></br>
            <p>{user.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTeacher;
