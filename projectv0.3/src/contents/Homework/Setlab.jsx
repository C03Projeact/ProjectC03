import React from "react";
import axios from "axios";
import apiURL from "../../api/api";
import TapbarTeacher from "../../components/TapbarTeacher";
import { useNavigate } from "react-router-dom"; // นำ useNavigate เข้ามา
import { useUser } from "../../App"; // นำเข้า useUser จาก context

function Setlab() {
  const { users } = useUser(); // Access user data from context

  const [labId, setLabId] = React.useState("");
  const [labAllow, setLabAllow] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [userSection, setUserSection] = React.useState(null);
  const [student, setStudent] = React.useState("");
  const [studentScore, setStudentScore] = React.useState(null);
  const [openTime, setOpenTime] = React.useState("");
  const [closeTime, setCloseTime] = React.useState("");
  const [status, setStatus] = React.useState(0);
  React.useEffect(() => {
    const url = window.location.href;
    const urlSplit = url.split("=");
    const id = urlSplit[1];
    setLabId(id);

    const formData = new FormData();
    formData.append("lab_id", id);

    axios
      .post(apiURL + "/set_lab.php", formData)
      .then((response) => {
        if (response.data === "0 results") {
          setLabAllow([]);
        } else {
          setLabAllow(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get(apiURL + "/get_all_student.php")
      .then((response) => {
        setUser(response.data);

        let section = [];
        response.data.forEach((item) => {
          if (!section.includes(item.section)) {
            section.push(item.section);
          }
        });
        setUserSection(section);
        console.log("section", section);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post(apiURL + "/get_student_score.php", formData)
      .then((response) => {
        if (response.data === "0 results") {
          setStudentScore([]);
        } else {
          setStudentScore(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const fetchLabData = (id) => {
    const formData = new FormData();
    formData.append("lab_id", id);

    axios
      .post(apiURL + "/set_lab.php", formData)
      .then((response) => {
        if (response.data === "0 results") {
          setLabAllow([]);
        } else {
          setLabAllow(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post(apiURL + "/get_student_score.php", formData)
      .then((response) => {
        if (response.data === "0 results") {
          setStudentScore([]);
        } else {
          setStudentScore(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const addStudent = () => {
    if (student === "") {
      alert("กรุณาเลือกนักเรียน");
      return;
    }

    const formData = new FormData();
    formData.append("lab_id", labId);
    formData.append("student_section", student);

    axios
      .post(apiURL + "/insert_lab_allow.php", formData)
      .then((response) => {
        fetchLabData(labId); // เรียกเพื่ออัปเดตข้อมูลใหม่
      })
      .catch((error) => {
        console.error("Error adding student: ", error);
      });
  };

  const deleteStudent = (id) => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(apiURL + "/delete_lab_allow.php", formData)
      .then((response) => {
        fetchLabData(labId); // เรียกเพื่ออัปเดตข้อมูลใหม่
      })
      .catch((error) => {
        console.error("Error deleting student: ", error);
      });
  };

  const updateScore = (id, lab_id, account_id, score) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("lab_id", lab_id);
    formData.append("account_id", account_id);
    formData.append("score", score);
    formData.append("submission_status", 1);

    axios
      .post(apiURL + "/update_score.php", formData)
      .then((response) => {
        console.log("Score updated:", response.data.message);
        alert("อัปเดทคะแนนเรียบร้อยแล้ว"); // แจ้งเตือนเมื่ออัปเดทสำเร็จ
        fetchLabData(labId); // เรียกเพื่ออัปเดตข้อมูลใหม่ในตาราง
      })
      .catch((error) => {
        console.error("Error updating score: ", error);
      });
  };
  const updateAllScores = () => {
    const formData = new FormData();
    const scoresWithStatus = studentScore.map((student) => ({
      ...student,
      submission_status: 1, // เพิ่มสถานะการส่งที่นี่
    }));
    formData.append("scores", JSON.stringify(scoresWithStatus)); // ส่งข้อมูลเป็น JSON

    axios
      .post(apiURL + "/update_all_scores.php", formData)
      .then((response) => {
        console.log("Response from server:", response.data);
        if (response.data.message) {
          alert(response.data.message); // แสดงข้อความที่ได้รับ
        }
        fetchLabData(labId); // เรียกเพื่ออัปเดตข้อมูลใหม่ในตาราง
      })
      .catch((error) => {
        console.error("Error updating scores: ", error);
      });
  };

  // Handle score change in dropdown
  const handleScoreChange = (index, newScore) => {
    const updatedScores = [...studentScore];
    updatedScores[index].score = newScore;
    setStudentScore(updatedScores);
  };

  const saveLabTime = () => {
    const formData = new FormData();
    formData.append("lab_id", labId);
    formData.append("open_time", openTime);
    formData.append("close_time", closeTime);
    formData.append("status", status);

    axios
      .post(apiURL + "/update_lab_time.php", formData)
      .then((response) => {
        console.log("response", response);
        if (response.data.success) {
          alert("บันทึกเวลาสำเร็จ");
        } else {
          alert("เกิดข้อผิดพลาด");
        }
      })
      .catch((error) => {
        console.error("Error saving time: ", error);
      });
  };

  const containerStyle = {
    padding: "20px",
    margin: "0 auto",
    maxWidth: "800px",
    fontFamily: "Arial, sans-serif",
    borderRadius: "10px",
    marginTop: "150px", // เพิ่มส่วนนี้เพื่อเว้นจาก Tapbar
  };

  const tableStyle = {
    width: "100%", // ทำให้ตารางมีความกว้าง 100%
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    backgroundColor: "#0056b3",
    color: "white",
    padding: "10px",
    textAlign: "center",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minWidth: "100px", // กำหนดความกว้างขั้นต่ำ
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", // ป้องกันไม่ให้ข้อความขึ้นบรรทัดใหม่
  };

  const inputStyle = {
    padding: "5px",
    margin: "10px 0",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <TapbarTeacher />
      <div>
        <h1>เปิด LAB</h1>
        <br></br>
        {/* ส่วนเวลาเปิด-ปิด LAB */}
        <h3>เวลาเปิด-ปิด LAB</h3>
        <input
          style={inputStyle}
          type="datetime-local"
          onChange={(e) => setOpenTime(e.target.value)}
          value={openTime}
        />
        <input
          style={inputStyle}
          type="datetime-local"
          onChange={(e) => setCloseTime(e.target.value)}
          value={closeTime}
        />

        <button style={buttonStyle} onClick={saveLabTime}>
          บันทึก
        </button>
        <br></br>
        <h3>เพิ่มนักศึกษา</h3>
        <select
          name="student"
          id="student"
          style={inputStyle}
          onChange={(e) => setStudent(e.target.value)}
        >
          <option value="">เลือก Section นักศึกษา </option>
          {userSection &&
            userSection.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <button style={buttonStyle} onClick={addStudent}>
          เพิ่ม
        </button>
      </div>

      <div>
        <h3>นักศึกษา</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>รหัสนักศึกษา</th>
              <th style={thStyle}>ชื่อ</th>
              <th style={thStyle}>นามสกุล</th>
              <th style={thStyle}>sec</th>
              <th style={thStyle}>ส่งงาน</th>
              <th style={thStyle}>action</th>
            </tr>
          </thead>
          <tbody>
            {labAllow &&
              labAllow.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.user_id}</td>
                  <td style={tdStyle}>{item.first_name}</td>
                  <td style={tdStyle}>{item.last_name}</td>
                  <td style={tdStyle}>{item.section}</td>
                  <td style={tdStyle}>
                    {item.submission_id ? (
                      <span className="checked">ส่งงานแล้ว</span>
                    ) : (
                      <span className="not-checked">ยังไม่ได้ส่งงาน</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() => deleteStudent(item.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h3>คะแนน</h3>
        <button style={buttonStyle} onClick={updateAllScores}>
          อัปเดททั้งหมด
        </button>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>รหัสนักศึกษา</th>
              <th style={thStyle}>ชื่อ</th>
              <th style={thStyle}>นามสกุล</th>
              <th style={thStyle}>คะแนน</th>
              <th style={thStyle}>ชื่อ LAB</th>
              <th style={thStyle}>ไฟล์ชิ้นงาน</th>
              <th style={thStyle}>ตรวจชิ้นงาน</th>
              <th style={thStyle}>action</th>
            </tr>
          </thead>
          <tbody>
            {studentScore &&
              studentScore.map((item, index) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.user_id}</td>
                  <td style={tdStyle}>{item.first_name}</td>
                  <td style={tdStyle}>{item.last_name}</td>
                  <td style={tdStyle}>
                    <select
                      value={item.score}
                      onChange={(e) => handleScoreChange(index, e.target.value)}
                    >
                      {[...Array(11).keys()].map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={tdStyle}>{item.lab_name}</td>

                  <td style={tdStyle}>
                    <a
                      href={apiURL + "/submit/" + item.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      รายละเอียดเอกสาร
                    </a>
                  </td>
                  <td
                    style={tdStyle}
                    className={
                      item.submission_status === "0" ? "not-checked" : "checked"
                    }
                  >
                    {item.submission_status === "0"
                      ? "ยังไม่ได้ตรวจ"
                      : "ตรวจแล้ว"}
                  </td>

                  <td style={tdStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() =>
                        updateScore(
                          item.id,
                          item.lab_id,
                          item.account_id,
                          item.score,
                          item.submission_status
                        )
                      }
                    >
                      อัพเดท
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Setlab;
