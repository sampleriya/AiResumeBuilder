"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);

  // State for dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user);
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router]);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const elementId = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle dropdown toggle
  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div
      id="navbar"
      className="navbar-area"
      style={{ fontFamily: "var(--fontFamily3)" }}
    >
      <div className="raimo-responsive-nav">
        <div className="container">
          <div className="raimo-responsive-menu">
            <div onClick={toggleMenu} className="hamburger-menu">
              {showMenu ? (
                <i className="bx bx-x"></i>
              ) : (
                <i className="bx bx-menu"></i>
              )}
            </div>
            <div className="logo">
              <Link href="/" onClick={closeMenu}>
                <p className="logo-text">
                  <img
                    src="/logo/cg-logo.jpg"
                    style={{ height: "1rem", marginRight: "8px" }}
                    alt="Corporate Gate Logo"
                  />
                  Corporate Gate
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={
          showMenu
            ? "show navbar navbar-expand-md navbar-light"
            : "navbar navbar-expand-md navbar-light hide-menu"
        }
      >
        <div className="container">
          <Link href="/" className="navbar-brand" onClick={closeMenu}>
            <h2
              style={{
                color: "#355773",
                fontFamily: "var(--fontFamily3)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-head"
            >
              <span>
                <img src="/logo/cg-logo.jpg" style={{ height: "3rem" }} />
              </span>
              Corporate Gate
            </h2>
          </Link>

          <div className="collapse navbar-collapse mean-menu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  href="/template"
                  className="dropdown-toggle nav-link"
                  onClick={() => {
                    handleDropdownToggle("resumeDropdown");
                    closeMenu();
                  }}
                  style={{ color: currentPath === "/template/" ? "blue" : "" }}
                >
                  Resume
                </Link>
                <ul
                  className={`dropdown-menu ${
                    activeDropdown === "resumeDropdown" ? "show" : "hide"
                  }`}
                >
                  <li className="nav-item">
                    <Link
                      href="/template/"
                      className="nav-link false"
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        color: currentPath === "/template/" ? "blue" : "inherit",
                      }}
                      onClick={closeMenu}
                    >
                      <img src="/res.png" alt="image" />
                      Resume
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item megamenu">
                <Link
                  href="/analyze"
                  className="dropdown-toggle nav-link"
                  onClick={() => {
                    handleDropdownToggle("analyzeDropdown");
                    closeMenu();
                  }}
                  style={{
                    color: currentPath === "/analyze/" ? "blue" : "inherit",
                  }}
                >
                  Resume Analysis
                </Link>
                <ul
                  className={`dropdown-menu ${
                    activeDropdown === "analyzeDropdown" ? "show" : "hide"
                  }`}
                >
                  <li className="nav-item">
                    <Link
                      href="/analyze/"
                      className="nav-link false"
                      style={{
                        color: currentPath === "/analyze/" ? "blue" : "inherit",
                      }}
                      onClick={closeMenu}
                    >
                      <img src="/res-2.png" alt="image" />
                      Resume Analysis
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item megamenu">
                <Link
                  href="/coverletter"
                  className="dropdown-toggle nav-link"
                  onClick={() => {
                    handleDropdownToggle("coverLetterDropdown");
                    closeMenu();
                  }}
                  style={{
                    color: currentPath === "/coverletter/" ? "blue" : "inherit",
                  }}
                >
                  Cover Letter
                </Link>
                <ul
                  className={`dropdown-menu ${
                    activeDropdown === "coverLetterDropdown" ? "show" : "hide"
                  }`}
                >
                  <li className="nav-item">
                    <Link
                      href="/coverletter/"
                      className="nav-link false"
                      style={{
                        color: currentPath === "/coverletter/" ? "blue" : "inherit",
                      }}
                      onClick={closeMenu}
                    >
                      <img src="/res-3.png" />
                      Cover Letter Builder
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  href="/skillmatching/"
                  className="nav-link false"
                  style={{
                    color: currentPath === "/skillmatching/" ? "blue" : "inherit",
                  }}
                  onClick={closeMenu}
                >
                  SkillQuest AI
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/new-blogs/"
                  className="nav-link false"
                  style={{
                    color: currentPath === "/new-blogs/" ? "blue" : "inherit",
                  }}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
            </ul>

            <div className="others-option">
              <div className="d-flex align-items-center">
                <div>
                  {user ? (
                    <Link
                      href="/login"
                      onClick={() => {
                        closeMenu();
                        handleSignOut();
                      }}
                      className="nav-btn"
                      style={{
                        background: "white",
                        border: "1px solid var(--optionalColor)",
                      }}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      style={{
                        fontWeight: "bold",
                        fontFamily: "var(--fontFamily3)",
                        background: "white",
                        border: "1px solid var(--optionalColor)",
                      }}
                      className="nav-btn"
                    >
                      Login
                    </Link>
                  )}
                </div>
                <div className="option-item d-none d-lg-block">
                  <Link
                    href="/template/"
                    className="nav-btn"
                    onClick={closeMenu}
                    style={{ color: "#fff" }}
                  >
                    Create Resume
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
