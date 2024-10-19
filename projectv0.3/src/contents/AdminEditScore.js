import React, { useState } from 'react';

const AdminEditScore = ({ match }) => {
  const userId = parseInt(match.params.id, 10); // Extracting user ID from the route parameter
  const [attendance, setAttendance] = useState(0);
  const [workpiece, setWorkpiece] = useState(0);
  const [midtermExam, setMidtermExam] = useState(0);
  const [finalExam, setFinalExam] = useState(0);

  const calculateFinalScore = () => {
    // Customize the weighting based on your grading system
    const attendanceWeight = 0.1;
    const workpieceWeight = 0.3;
    const midtermExamWeight = 0.35;
    const finalExamWeight = 0.35;

    // Calculate the final score based on the weights
    const finalScore =
      attendance * attendanceWeight +
      workpiece * workpieceWeight +
      midtermExam * midtermExamWeight +
      finalExam * finalExamWeight;

    return finalScore;
  };

  const saveScore = () => {
    // Save the scores to the user or perform necessary actions
    const finalScore = calculateFinalScore();
    console.log(`Saving scores for user with ID ${userId}`);
    console.log(`Attendance: ${attendance}`);
    console.log(`Workpiece: ${workpiece}`);
    console.log(`Midterm Exam: ${midtermExam}`);
    console.log(`Final Exam: ${finalExam}`);
    console.log(`Final Score: ${finalScore}`);
  };

  return (
    <div className="edit-score-container">
      <h2>Edit Score</h2>
      <p>User ID: {userId}</p>

      <label className="edit-score-label">
        Attendance (10%):
        <input type="number" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="edit-score-input" />
      </label>

      <label className="edit-score-label">
        Workpiece (30%):
        <input type="number" value={workpiece} onChange={(e) => setWorkpiece(e.target.value)} className="edit-score-input" />
      </label>

      <label className="edit-score-label">
        Midterm Exam (35%):
        <input type="number" value={midtermExam} onChange={(e) => setMidtermExam(e.target.value)} className="edit-score-input" />
      </label>

      <label className="edit-score-label">
        Final Exam (35%):
        <input type="number" value={finalExam} onChange={(e) => setFinalExam(e.target.value)} className="edit-score-input" />
      </label>

      <button onClick={saveScore} className="edit-score-button">Save Scores</button>
    </div>
  );
};

export default AdminEditScore;
