import React, { Component } from "react";
import Tapbar from "../components/Tapbar";
import { useUser } from "../App";
import Compiler from "./Compiler";
function Lab1() {
  const { user } = useUser();
    return (
      <div>
        {/* <Tapbar></Tapbar> */}
        <Compiler></Compiler>
      </div>
    );
  }

export default Lab1;
