"use client";
import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const errorMessages = {
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'The password is incorrect.',
  'auth/network-request-failed': 'Network error. Please try again later.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
  'auth/email-already-in-use': 'The email address is already in use by another account.',
  // Add other error codes and messages as needed
};

const LoginPage = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        toast.success("Login successful!");
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      const errorMessage = errorMessages[error.code] || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!username) {
      toast.error("Please enter your email address to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, username);
      toast.success("Password reset link sent! Check your email.");
    } catch (error) {
      const errorMessage = errorMessages[error.code] || error.message;
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      // No need to manually redirect, onAuthStateChanged will handle this
    } catch (error) {
      console.log(error, "error is here")
      const errorMessage = errorMessages[error.code] || error.message;

      setError(errorMessage);
      toast.error("Please Check your Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.leftSection}>
        <div className={styles.imageContainer}>
          <img src="/lo.png" alt="Login" className={styles.image} />
          <div className={styles.textOverlay} style={{ color: "white" }}>
            <h2>Log In and Shine: Let AI Craft Your Perfect Resume</h2>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rm}>
          <div className={styles.head}>
            <h3>Login To Your Account</h3>
          </div>
          <div className={styles.btn}>
            <div className={styles.google} onClick={handleGoogleSignIn}>
              <img src="/google.png" alt="" style={{ width: "1rem" }} />
              <h6 style={{ margin: "0" }}>Sign in with Google</h6>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleLogin}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? <ClipLoader size={24} color="#ffffff" /> : "Log In"}
            </button>
            <div className={styles.links}>
              <p>
                Don’t have an account? <a href="/register">Register</a>
              </p>
              <p style={{ textAlign: "center", marginTop: "3rem" }}>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  style={{
                    fontSize: "20px",
                    fontWeight: "200",
                    textDecoration: "underline",
                    color: "inherit",
                  }}
                >
                  Forgot Password?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
