import React from "react";
import { Link } from "react-router-dom";
import Tapbar from "../../components/Tapbar";
import axios from "axios";
import apiURL from "../../api/api";
import token from "../../api/token";
import CryptoJS from "crypto-js";

const HomeworkPage = () => {
  const [homeworkList, setHomeworkList] = React.useState([]);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let encryptedData = localStorage.getItem("user");

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, token);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );

    setUser(decryptedData.user);

    const formData = new FormData();
    formData.append("id", decryptedData.user.id);

    axios
      .post(apiURL + "/homework_student.php", formData)
      .then((response) => {
        setHomeworkList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <Tapbar />
      <div className="main-container">
        <div className="homework-container">
          {[...new Set(homeworkList.map((item) => item.chapter))].map(
            (chapter) => (
              <div key={chapter} className="chapter-container">
                <h2>LAB</h2>
                <ul className="homework-list">
                  {homeworkList
                    .filter((homework) => homework.chapter === chapter)
                    .map((homework, index) => {
                      const openTime = new Date(homework.open_time).getTime();
                      const closeTime = new Date(homework.close_time).getTime();
                      const currentTime = new Date().getTime();

                      if (openTime < currentTime && closeTime > currentTime) {
                        return (
                          <li key={index} className="homework-item">
                            <Link
                              to={`/homework_code?id=${homework.lab_id}`}
                              className="homework-link"
                            >
                              {homework.lab_name}
                            </Link>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index} className="homework-item disabled">
                            <span
                              className="homework-link disabled"
                              onClick={() => alert("ยังไม่เปิดให้ทำ")}
                            >
                              {homework.lab_name}
                            </span>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx="true">{`
        .main-container {
          padding: 20px;
          background-color: #f9f9f9;
          max-width: 100%;
        }

        .homework-container {
          margin: 0 auto;
        }

        .homework-container {
          margin-top: 160px;
          width: 70%;
          justify-content: center;
          position: flex;
        }

        .chapter-container {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          padding: 20px;
          background-color: #ddd;
          border-radius: 8px;
          max-width: 100%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .chapter-container h2 {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .homework-list {
          list-style-type: none;
          padding-left: 0;
          max-width: 100%;
        }

        .homework-item {
          margin-bottom: 15px;
        }

        .homework-link {
          text-decoration: none;
          font-size: 18px;
          color: #007bff;
          cursor: pointer;
          transition: color 0.2s;
        }

        .homework-link:hover {
          color: #0056b3;
        }

        .homework-link.disabled {
          color: #888;
          cursor: not-allowed;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default HomeworkPage;
