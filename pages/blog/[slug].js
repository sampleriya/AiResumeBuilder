import React from 'react';
import Head from 'next/head';
import SingleBlog from '../../components/BlogDetails/SingleBlog';

const BlogName = () => {
  return (
    <div>
      <Head>
        <title>Blog Detail | Corporate Gate</title>
        <meta
          name="description"
          content="Read in-depth insights and expert advice on various topics related to professional resume building and career development in this blog post on Corporate Gate."
        />
        <meta
          name="keywords"
          content="blog, Corporate Gate, resume tips, career development, professional advice, resume building, job search"
        />
      </Head>
      <SingleBlog />
    </div>
  );
};

export default BlogName;
