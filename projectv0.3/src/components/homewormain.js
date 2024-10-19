import React, { Component } from "react";
import Homeworkitems from "./Homeworkitem";

class Homework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChapterIndex: 0,
      chapterVisibility: Array(8).fill(false),
      chapters: [
        { chapterTitle: "Chapter 1", link: "/Homework1" },
        { chapterTitle: "Chapter 2", link: "/Homework2" },
        { chapterTitle: "Chapter 3", link: "/Homework3" },
        { chapterTitle: "Chapter 4", link: "/Homework4" },
        { chapterTitle: "Chapter 5", link: "/Homework5" },
        { chapterTitle: "Chapter 6", link: "/Homework6" },
        { chapterTitle: "Chapter 7", link: "/Homework7" },
        { chapterTitle: "Chapter 8", link: "/Homework8" },
        { chapterTitle: "Chapter 9", link: "/Homework9" },
        { chapterTitle: "Chapter 10", link: "/Homework10" },
      ],
    };
  }

  handleButtonClick = (index) => {
    this.setState((prevState) => ({
      selectedChapterIndex: index,
      chapterVisibility: prevState.chapterVisibility.map((val, i) => (i === index ? !val : false)),
    }));
  };

  render() {
    const selectedChapter = this.state.chapters[this.state.selectedChapterIndex];

    return (
      <div>
        <div className="navbar">
          {this.state.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`chapter-container ${index === this.state.selectedChapterIndex ? "selected" : ""}`}
            >
              <nav onClick={() => this.handleButtonClick(index)}>
                <a href={chapter.link}>{chapter.chapterTitle}</a>
              </nav>
              {this.state.chapterVisibility[index] && (
                <nav className={chapter.chapterTitle.replace(" ", "-")}>
                  {/* No subtopics are displayed here */}
                </nav>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homework;
