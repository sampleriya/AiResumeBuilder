import React from 'react';
import Head from 'next/head';
import CustomSlider from '../components/CustomSlider/CustomSlider';
import AllBlogs from '../components/AllBlogs/AllBlogs';

const NewBlogs = () => {
  return (
    <>
      <Head>
        <title>New Blogs | AiResumeBuilder</title>
        <meta name="description" content="Explore the latest blogs on market news, technical analysis, and more. AiResumeBuilder provides up-to-date and insightful content to keep you informed." />
        <meta name="keywords" content="blogs, market news, technical analysis, financial insights, latest blogs" />
        <meta property="og:title" content="New Blogs | AiResumeBuilder" />
        <meta property="og:description" content="Explore the latest blogs on market news, technical analysis, and more. AiResumeBuilder provides up-to-date and insightful content to keep you informed." />
        {/* <meta property="og:image" content="/path/to/og-image.jpg" /> */}
        <meta property="og:url" content="https://www.yoursite.com/new-blogs" />
      </Head>
      <div>
        <CustomSlider />
        <div>
          <AllBlogs />
        </div>
      </div>
    </>
  );
};

export default NewBlogs;
