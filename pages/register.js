import React from 'react';
import Head from 'next/head';
import Register from '../components/Login/Resgister';

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>Register | Corporate Gate</title>
        <meta
          name="description"
          content="Create your account with Corporate Gate to start building your professional resume and explore our skill matching tools. Easy and secure registration process."
        />
        <meta
          name="keywords"
          content="register, sign up, Corporate Gate, resume builder registration, professional resume, account creation, secure registration"
        />
      </Head>
      <Register />
    </div>
  );
};

export default RegisterPage;
