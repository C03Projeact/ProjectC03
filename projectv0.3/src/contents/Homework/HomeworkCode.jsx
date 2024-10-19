import React from "react";
import axios from "axios";
import apiURL from "../../api/api";
import token from "../../api/token";
import CryptoJS from "crypto-js";
import Compiler from "../Compiler";
import { useSearchParams } from "react-router-dom";
import Tapbar from "../../components/Tapbar";

function HomeworkCode() {
  const [user, setUser] = React.useState(null);
  const [labId, setLabId] = React.useState(null);
  const [lab, setLab] = React.useState(null);
  const [docContent, setDocContent] = React.useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("Lab ID from params:", id); // ตรวจสอบค่า labId
  const [fileType, setFileType] = React.useState(null);

  // Decrypt user data
  React.useEffect(() => {
    let encryptedData = localStorage.getItem("user");

    if (encryptedData) {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, token);
        const decryptedData = JSON.parse(
          decryptedBytes.toString(CryptoJS.enc.Utf8)
        );
        setUser(decryptedData.user);
      } catch (error) {
        console.error("Error decrypting user data:", error);
      }
    }
  }, []);

  // Fetch lab data
  React.useEffect(() => {
    if (id) {
      setLabId(id);
      axios
        .get(`${apiURL}/lab.php?id=${id}`)
        .then((response) => {
          console.log("Lab response:", response.data);
          setLab(response.data.lab);
          setDocContent(response.data.doc_content);
          setFileType(response.data.file_type); // Assume file_type is returned from PHP
        })
        .catch((error) => {
          console.error("Error fetching lab:", error);
        });
    }
  }, [id]);

  // File upload handler
  const handleFileUpload = () => {
    const fileInput = document.getElementById("file");
    if (fileInput && fileInput.files.length > 0 && user) {
      let file = fileInput.files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.id);
      formData.append("lab_id", labId);

      axios
        .post(`${apiURL}/submit.php`, formData)
        .then((response) => {
          console.log(response.data);
          fileInput.value = "";
          alert("Homework submitted successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("File or user data is missing");
    }
  };

  return (
    <div style={styles.container}>
        <Tapbar />
        <div style={styles.card}>
            {lab ? (
                <>
                    {fileType === 'docx' ? (
                        <div style={styles.docContent}>{docContent || "Loading .docx content..."}</div>
                    ) : fileType === 'pdf' ? (
                        <iframe 
                            src={`data:application/pdf;base64,${docContent}`} 
                            style={{ width: '100%', height: '500px' }} 
                            title="PDF Viewer"
                        />
                    ) : (
                        <p>Unsupported file type.</p>
                    )}
                </>
            ) : (
                <p>Loading lab...</p>
            )}
        </div>
        <div>
            <Compiler />
        </div>
        <div style={styles.card}>
            <input type="file" id="file" name="file" style={styles.fileInput} />
            <button onClick={handleFileUpload} style={styles.button}>
                Submit Homework
            </button>
        </div>
    </div>
  );
}

const styles = {
  container: {
    // maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    paddingTop: "150px", // เพิ่ม padding ด้านบนเพื่อไม่ให้เนื้อหาทับกับ Tapbar
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.2em",
    marginBottom: "10px",
    color: "#555",
  },
  docContent: {
    whiteSpace: "pre-wrap",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  fileInput: {
    display: "block",
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default HomeworkCode;
