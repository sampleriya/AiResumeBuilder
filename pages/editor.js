"use client"
import React from 'react'
import Head from 'next/head'
import EditorResume from '../components/EditorResume/EditorResume'
import { useSelector } from 'react-redux'

const Editor = () => {
  const resumeId = useSelector((state) => state.resumeId);
  console.log(resumeId)

  return (
    <div>
      <Head>
        <title>Resume Editor - Corporate Gate</title>
        <meta name="description" content="Edit and customize your resume using our professional tools." />
        <meta name="keywords" content="resume editor, professional resume, Corporate Gate, resume customization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EditorResume id={resumeId}/>
    </div>
  )
}

export default Editor;
