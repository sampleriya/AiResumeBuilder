"use client";
import React from "react";
import Head from "next/head";
import ResumeAnalyze from "../components/Resume/ResumeAnalyze";
// import pdfjs from "pdfjs"

const ResumeAnalysis = () => {
  // const { pdfViewer} =  pdfjs
  return (
    <>
      <Head>
        <title>Resume Analysis | Corporate Gate</title>
        <meta name="description" content="Analyze your resume to identify mistakes and see the percentage of errors. Corporate Gate offers a comprehensive resume analysis tool to improve your resume's effectiveness." />
        <meta name="keywords" content="resume analysis, resume mistakes, resume feedback, resume errors, percentage of mistakes" />
        <meta property="og:title" content="Resume Analysis | Corporate Gate" />
        <meta property="og:description" content="Analyze your resume to identify mistakes and see the percentage of errors. Corporate Gate offers a comprehensive resume analysis tool to improve your resume's effectiveness." />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://www.yoursite.com/resume-analysis" />
      </Head>
      <ResumeAnalyze />
    </>
  );
};

export default ResumeAnalysis;
