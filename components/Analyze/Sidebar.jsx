"use client";

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from './Sidebar.module.css';  // Importing the CSS module
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Sidebar = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user , setUser] = useState(null)

  console.log(user, "user is here")

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);
  
  const handleForgotPassword = async () => {
    if (!username) {
      toast.error("Please enter your email address to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, username);
      toast.success("Password reset link sent! Check your email.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const data = [
    // { doc: "My Account", img: "/icon.png" },
    { doc: "My Resume", img: "/icon.png" },
    // { doc: "My Details", img: "/icon.png" },
    // { doc: "Edit Profile", img: "/icon.png" },
    // { doc: "Settings", img: "/icon.png" },
  ];

  return (
    <div
      className="custom-sidebar"
      style={{ fontFamily: "var(--fontfamily3)" }}
    >
      {user ? (
        <div>
          <img
            src="/alog.png"
            alt="Profile"
            className="custom-profile-image"
          />
          <p>Welcome Back</p>
          <h2>{user.displayName || "User"}</h2> {/* Display user's name if available */}

          <div className="side-box">
            {data.map((items, i) => (
              <div className="box" key={i}>
                <img src={items.img} style={{ height: "20px" }} />
                <h6>{items.doc}</h6>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <img src="/alog.png" alt="Logo" className={styles.logo} />
          <p className={styles.getStarted} style={{margin:"0"}}>Get Started</p>
          <h6 className={styles.loginTitle} style={{margin:"0"}}>Log In</h6>
          <p className={styles.separator} style={{margin:"0"}}>OR</p>
          <h6 className={styles.createAccountTitle} style={{margin:"0"}}>Create Your Account</h6>

          <form className={styles.formGroup} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email"
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
              <p style={{textAlign:"left"}}>
                Don’t have an account? <a href="/register" style={{color:"var(--mainColor)"}}>Register</a>
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
      )}
    </div>
  );
};

export default Sidebar;
