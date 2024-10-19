import React from "react";
import apiURL from "../api/api";

const Compiler = () => {
  return (
    <div>
      <iframe
        title="Compiler Content"
        src={apiURL + "/compiler"}
        width="100%"
        height="700px"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default Compiler;
