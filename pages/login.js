import React from 'react';
import Head from 'next/head';
import LoginPage from '../components/Login/Login';

const Login = () => {
  return (
    <div>
      <Head>
        <title>Login | Corporate Gate</title>
        <meta
          name="description"
          content="Login to Corporate Gate to access your professional resume builder and skill matching tools. Secure and easy login process."
        />
        <meta
          name="keywords"
          content="login, Corporate Gate, resume builder login, professional resume, secure login"
        />
      </Head>
      <LoginPage />
    </div>
  );
};

export default Login;
