import React from 'react';
import Head from 'next/head';
import SkillMatching from '../components/SkillMatching/SkillMatching';

const SkillMatchingPage = () => {
  return (
    <div>
      <Head>
        <title>Skill Sets | AiResumeBuilder</title>
        <meta
          name="description"
          content="Analyze job descriptions and discover the required skills, desired skills, and additional skills with AiResumeBuilder's Skill Matching tool."
        />
        <meta
          name="keywords"
          content="skill matching, job skills, required skills, desired skills, additional skills, job description analysis, AiResumeBuilder"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Skill Sets | AiResumeBuilder" />
        <meta
          property="og:description"
          content="Analyze job descriptions and discover the required skills, desired skills, and additional skills with AiResumeBuilder's Skill Matching tool."
        />
        {/* <meta property="og:image" content="/path/to/your/image.jpg" /> */}
        {/* <meta property="og:url" content="https://www.corporategate.com/skill-matching" /> */}
        {/* <meta property="og:type" content="website" /> */}
      </Head>
      <SkillMatching />
    </div>
  );
};

export default SkillMatchingPage;
