// App.js
import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./contents/Home";
import Profile from "./contents/Profile";
import Login from "./components/Login";
import Admin from "./contents/Admin";
import AdminTeacher from "./contents/AdminTeacher";
import AdminStudent from "./contents/AdminStudent";
import TeacherStudent from "./contents/TeacherStudent";
import AdminAddUserAdmin from "./contents/AdminAddUserAdmin";
import AdminAddUserTeacher from "./contents/AdminAddUserTeacher";
import AdminAddUserStudent from "./contents/AdminAddUserStudent";
import TeacherAddUserStudent from "./contents/TeacherAddUserStudent";
import ProfileTeacher from "./contents/ProfileTeacher";
import AdminLessons from "./contents/AdminLessons";
import AdminContentEditor from "./contents/AdminContentEditor";
import AdminEditScore from "./contents/AdminEditScore";
import HomeworkForm from "./contents/AdminHomeworkForm";
import EditUserAdmin from "./contents/EditUserAdmin";
import EditUserTeacher from "./contents/EditUserTeacher";
import EditUserStudent from "./contents/EditUserStudent";
import TeacherEditUserStudent from "./contents/TeacherEditUserStudent";
import Compiler from "./contents/Compiler";
import AddLesson from "./contents/AddLesson";
import EditLesson from "./contents/EditLesson";
import EditLab from "./contents/EditLab";
import AddLab from "./contents/AddLab";
import HomeTeacher from "./contents/HomeTeacher";
import Lab1 from "./contents/Lab1";
import Chapter from "./contents/Lessons/chapter";
import ChapterTeacher from "./contents/Lessons/ChapterTeacher";
import Schedule_Assignments from "./contents/Homework/Schedule_Assignments";
import Setlab from "./contents/Homework/Setlab";
import HomeworkCode from "./contents/Homework/HomeworkCode";
import SetScore from "./contents/Homework/SetScore";
import HomeworkPage from "./contents/Homework/Homeworkpage";
import AdminLabEditor from "./contents/AdminLabEditor";
import Page1 from "./contents/Page1";
import ScorePage from "./contents/ScorePage";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router basename="/ProjectC03">
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homework" element={<HomeworkPage />} />
            <Route path="/add-lessons" element={<AddLesson />} />
            <Route path="/edit-lessons/:lesson_id" element={<EditLesson />} />
            <Route path="/edit-labs/:lab_id" element={<EditLab />} />
            <Route path="/add-labs" element={<AddLab />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-teacher" element={<AdminTeacher />} />
            <Route path="/admin-student" element={<AdminStudent />} />
            <Route path="/teacher-student" element={<TeacherStudent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Compiler" element={<Compiler />} />
            <Route path="/hometeacher" element={<HomeTeacher />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ProfileTeacher" element={<ProfileTeacher />} />
            <Route path="/admin-adduser-admin" element={<AdminAddUserAdmin />} />
            <Route path="/admin-adduser-teacher" element={<AdminAddUserTeacher />} />
            <Route path="/admin-adduser-student" element={<AdminAddUserStudent />} />
            <Route path="/teacher-adduser-student" element={<TeacherAddUserStudent />} />
            <Route path="/user/admin/:id/edit" element={<EditUserAdmin />} />
            <Route
              path="/user/teacher/:id/edit"
              element={<EditUserTeacher />}
            />
            <Route
              path="/user/student/:id/edit"
              element={<EditUserStudent />}
            />
            <Route
              path="/user/teacherstudent/:id/edit"
              element={<TeacherEditUserStudent />}
            />
            <Route
              path="/admin-content-editor"
              element={<AdminContentEditor />}
            />
            <Route path="/admin-edit-score" element={<AdminEditScore />} />
            <Route path="/admin-lessons" element={<AdminLessons />} />
            <Route path="/admin-lab-editor" element={<AdminLabEditor />} />
            <Route
              path="/schedule_assignments"
              element={<Schedule_Assignments />}
            />
            <Route path="/set_lab" element={<Setlab />} />
            <Route path="/set_score" element={<SetScore />} />
            <Route path="/homework_code" element={<HomeworkCode />} />
            <Route path="/lab1" element={<Lab1 />} />
            <Route path="/Chapter/:lesson_name" element={<Chapter />} />
            <Route
              path="/ChapterTeacher/:lesson_name"
              element={<ChapterTeacher />}
            />
            <Route path="/score" element={<ScorePage />} />
            <Route path="/Page1" element={<Page1 />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default App;
