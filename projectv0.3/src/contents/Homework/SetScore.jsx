import React from "react";
import axios from "axios";
import apiURL from "../../api/api";

function SetScore({ labId }) {
  const [studentScore, setStudentScore] = React.useState([]);

  React.useEffect(() => {
    const formData = new FormData();
    formData.append("lab_id", labId);

    axios
      .post(apiURL + "/get_student_score.php", formData)
      .then((response) => {
        if (response.data === "0 results") {
          setStudentScore([]);
        } else {
          setStudentScore(response.data);
          console.log("student score: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [labId]);

  const updateScore = (id, score) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("score", score);

    axios
      .post(apiURL + "/update_score.php", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleScoreChange = (index, newScore) => {
    const updatedScores = [...studentScore];
    updatedScores[index].score = newScore;
    setStudentScore(updatedScores);
  };

  return (
    <div>
      <h3>Score</h3>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>score</th>
            <th>file</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {studentScore &&
            studentScore.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <input
                    type="number"
                    value={item.score}
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <a
                    href={apiURL + "/submit/" + item.file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.file}
                  </a>
                </td>
                <td>
                  <button onClick={() => updateScore(item.id, item.score)}>
                    update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SetScore;
