"use client";
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Analyze/Sidebar";
import Header from "../components/Analyze/Header";
import ResumeList from "../components/Analyze/ResumeList";

const Analyze = () => {
  return (
    <>
      <Head>
        <title>Resume Analysis | Corporate Gate</title>
        <meta name="description" content="Upload your resume to get detailed feedback on mistakes and improve your resume's effectiveness. Corporate Gate provides insightful analysis to enhance your resume." />
        <meta name="keywords" content="resume analysis, resume feedback, resume mistakes, improve resume" />
        <meta property="og:title" content="Resume Analysis | Corporate Gate" />
        <meta property="og:description" content="Upload your resume to get detailed feedback on mistakes and improve your resume's effectiveness. Corporate Gate provides insightful analysis to enhance your resume." />
        {/* <meta property="og:image" content="/path/to/og-image.jpg" /> */}
        <meta property="og:url" content="https://www.yoursite.com/analyze" />
      </Head>
      <div className="custom-app" style={{fontFamily:"var(--fontFamily"}}>
        <Sidebar />
        <div className="custom-main-content">
          <Header />
          <ResumeList />
        </div>
      </div>
    </>
  );
};

export default Analyze;
