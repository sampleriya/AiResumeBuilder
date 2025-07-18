import React from "react";
import Head from "next/head";
import EditorResume from "../components/EditorResume/EditorResume";
import { useSelector } from "react-redux";
import Preview from "../components/Preview/Preview";

const preview = () => {
  const resumeId = useSelector((state) => state.resumeId);
  console.log(resumeId);
  return <div>
    <Preview id={resumeId}/>
  </div>;
};

export default preview;
