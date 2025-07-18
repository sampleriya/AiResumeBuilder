import React from 'react'
import Head from 'next/head'
import Main from '../components/MainPageTemplate/Main'

const CategoryTemplate = () => {
  return (
    <div>
      <Head>
        <title>Category Template - Corporate Gate</title>
        <meta name="description" content="Explore various categories and templates for your professional needs at Corporate Gate." />
        <meta name="keywords" content="category template, professional templates, Corporate Gate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main/>
    </div>
  )
}

export default CategoryTemplate;
