import React from "react";
import { useNavigate } from "react-router-dom";
import AdminItems from "./AdminItems";
import { useUser } from "../App"; // นำเข้า useUser จาก context

function Adminbar() {
  const { user, setUser } = useUser(); // ดึง user และ setUser ออกจาก context
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const handleLogout = () => {
    setUser(null); // ลบข้อมูลผู้ใช้
    localStorage.removeItem("token"); // ลบ token หรือข้อมูลจาก localStorage
    navigate("/", { replace: true }); // เปลี่ยนเส้นทางไปหน้า login
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="admin-options">
        <AdminItems tolink="/admin" item="บัญชีผู้ดูแลระบบ" />
        <AdminItems tolink="/admin-teacher" item="บัญชีอาจารย์" />
        <AdminItems tolink="/admin-student" item="บัญชีนักศึกษา" />
        <AdminItems tolink="/admin-content-editor" item="ตั้งค่าบทเรียน" />
        <AdminItems tolink="/admin-lab-editor" item="ตั้งค่า LAB" />
        <button className="logout-btn" onClick={handleLogout}>
          {" "}
          {/* ใช้ handleLogout แทน this.handleLogout */}
          ออกจากระบบ
        </button>
      </ul>
    </div>
  );
}

export default Adminbar;
