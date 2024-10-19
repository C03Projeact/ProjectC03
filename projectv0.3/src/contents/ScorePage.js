import React from "react";
import axios from "axios";
import apiURL from "../api/api"; 
import Tapbar from "../components/Tapbar";
import { useUser } from "../App"; // Import the useUser hook

const ScorePage = () => {
  const { user } = useUser(); // Get user from context
  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      fetchScores(user.id); // Pass user.id to fetchScores
    }
  }, [user]);

  const fetchScores = async (accountId) => {
    try {
      const response = await axios.get(apiURL + "/get_score.php", {
        params: { account_id: accountId }, // Send account_id as query parameter
      });
      console.log(response.data); // Check fetched data
      if (Array.isArray(response.data)) {
        setScores(response.data);
      } else {
        setScores([]);
      }
    } catch (error) {
      console.error(error); // Log error to console
      setError("Error fetching scores");
    } finally {
      setLoading(false);
    }
  };

  // Styles similar to Setlab
  const containerStyle = {
    padding: "20px",
    margin: "0 auto",
    maxWidth: "800px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    marginTop: "150px",
  };

  const tableStyle = {
    width: "100%",
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
  };

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={containerStyle}>{error}</div>;
  }

  // Ensure scores is an array before mapping
  if (!Array.isArray(scores)) {
    return <div style={containerStyle}>No scores found</div>;
  }

  return (
    <div style={containerStyle}>
      <Tapbar />
      <h1>คะแนน:</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ชื่อ LAB</th>
            <th style={thStyle}>ไฟล์ชิ้นงาน</th>
            <th style={thStyle}>คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td style={tdStyle}>{score.lab_name}</td>
              <td style={tdStyle}>
                <a
                  href={apiURL + "/submit/" + score.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  รายละเอียดเอกสาร
                </a>
              </td>
              <td style={tdStyle}>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScorePage;
