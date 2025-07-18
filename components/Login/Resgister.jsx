"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider , signOut} from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Save user data to Firestore
      await setDoc(doc(db, "userAdmin", user.uid), {
        email: user.email,
        username: user.displayName || "Anonymous",
        id: user.uid,
        createdAt: serverTimestamp(),
      });
  
      // Log out the user immediately after successful sign-up
      await auth.signOut();
  
      toast.success("Registration successful with Google! Logging out...");
  
      // Redirect to login page after successful logout
      router.push("/login");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("An error occurred during Google sign-in. Please try again.");
      toast.error("An error occurred during Google sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        await setDoc(doc(db, "userAdmin", data.uid), {
          email: data.email,
          username: formData.username,
          id: data.uid,
          createdAt: serverTimestamp(),
        });

        toast.success("Registration successful! Logging out...");

        const logoutResponse = await fetch("/api/logout", {
          method: "POST",
        });

        if (logoutResponse.ok) {
          toast.success("You have been logged out. Redirecting to login...");
          router.push("/login");
        } else {
          const logoutError = await logoutResponse.json();
          setError(logoutError.error);
          toast.error(logoutError.error);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.imageContainer}>
          <img src="/lo.png" alt="Login" className={styles.image} />
          <div className={styles.textOverlay} style={{ color: "white" }}>
            <h2>Sign Up and Shine: Let AI Craft Your Perfect Resume</h2>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rm}>
          <div className={styles.head}>
            <h3>Create Account</h3>
          </div>
          <div className={styles.btn}>
            <div
              className={styles.google}
              onClick={handleGoogleSignIn}
              style={{ cursor: "pointer" }}
            >
              <img src="/google.png" alt="" style={{ width: "1rem" }} />
              <h6 style={{ margin: "0" }}>Sign up with Google</h6>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? <ClipLoader size={24} color="#ffffff" /> : "Register"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.links}>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
