import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiURL from "../api/api"; 

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
    };
  }

  componentDidMount() {
    this.fetchLessons();
  }

  fetchLessons = async () => {
    try {
      const response = await axios.get(
        apiURL + "/insert_lessons.php"
      );
      const lessons = response.data;

      this.setState({
        chapters: lessons.map((lesson) => lesson.lesson_name),
      });
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  render() {
    return (
      <div>
        <div className="navbar">
          {this.state.chapters.map((chapter, index) => (
            <div key={index} className="chapter-container">
              <Link to={`/Chapter/${encodeURIComponent(chapter)}`}>
                {`บทที่ ${index + 1}`} {/* แสดงชื่อบทเรียนด้วย */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Navbar;
