"use client"
import React from 'react';
import Head from 'next/head';
import CoverLetter from '../components/CoverLetter/CoverLetter';

const CoverLetterPage = () => {
  return (
    <>
      <Head>
        <title>Cover Letter Generator | AiResumeBuilder</title>
        <meta name="description" content="Generate a professional cover letter by uploading your resume. AiResumeBuilder provides an easy-to-use tool for creating effective cover letters." />
        <meta name="keywords" content="cover letter generator, resume cover letter, professional cover letter, create cover letter" />
        <meta property="og:title" content="Cover Letter Generator | AiResumeBuilder" />
        <meta property="og:description" content="Generate a professional cover letter by uploading your resume. AiResumeBuilder provides an easy-to-use tool for creating effective cover letters." />
        {/* <meta property="og:image" content="/path/to/og-image.jpg" /> */}
        <meta property="og:url" content="https://www.yoursite.com/coverletter" />
      </Head>
      <div>
        <CoverLetter />
      </div>
    </>
  );
};

export default CoverLetterPage;
