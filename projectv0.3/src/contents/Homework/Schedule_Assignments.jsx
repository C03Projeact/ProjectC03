import React from "react";
import axios from "axios";
import apiURL from "../../api/api";
import token from "../../api/token";
import CryptoJS from "crypto-js";
import TapbarTeacher from "../../components/TapbarTeacher";
import { Link } from "react-router-dom";

function Schedule_Assignments() {
  const [labs, setLabs] = React.useState([]);

  React.useEffect(() => {
    let user = localStorage.getItem("user");

    // Decrypt the data before logging it
    const decryptedBytes = CryptoJS.AES.decrypt(user, token);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );

    console.log("Decrypted Data:", decryptedData); // Log the decrypted data

    if (decryptedData.user.role === "2") {
      axios
        .get(apiURL + "/home-teacher.php")
        .then((response) => {
          console.log(response.data);
          setLabs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, []);

  return (
    <div>
      <TapbarTeacher />
      <br></br>
      <div style={{ padding: "20px", marginTop: "80px" }}>
        <h1
          style={{
            marginTop: "20px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "2.5rem",
          }}
        >
          กำหนดการส่งงาน
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              width: "80%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "2px solid #f2f2f2",
                    padding: "10px",
                    textAlign: "left",
                    color: "#333",
                    width: "70%",
                  }}
                >
                  ชื่อ LAB
                </th>
                <th
                  style={{
                    borderBottom: "2px solid #f2f2f2",
                    padding: "10px",
                    textAlign: "left",
                    color: "#333",
                    width: "30%",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr key={lab.lab_id}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #f2f2f2",
                      wordWrap: "break-word",
                    }}
                  >
                    {lab.lab_name}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    <Link
                      to={`/set_lab?id=${lab.lab_id}`}
                      style={{
                        textDecoration: "none",
                        color: "#007BFF",
                        fontWeight: "bold",
                      }}
                    >
                      รายละเอียด
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Schedule_Assignments;
