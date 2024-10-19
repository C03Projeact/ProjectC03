import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import apiURL from "../api/api"; 

function LessonForm() {
    const [lessonName, setLessonName] = useState('');
    const [contentFile, setContentFile] = useState('');
    const [status, setStatus] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('lesson_name', lessonName);
        formData.append('content_file', contentFile);
        formData.append('status', status);

        try {
            await axios.post(apiURL + '/insert_lessons.php', formData);
            console.log('Data inserted successfully.');
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Lesson Name" value={lessonName} onChange={(e) => setLessonName(e.target.value)} />
            <input type="file" onChange={(e) => setContentFile(e.target.files[0])} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="0">0</option>
                <option value="1">1</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default LessonForm;
