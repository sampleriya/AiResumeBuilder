"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setResumeDataIT3,
  addSection,
  removeSection,
  setResumeId,
  setColor,
  resetColor,
} from "../../store";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ChromePicker } from "react-color";
import styles from "./EditorResume.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CircularProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import GridComponent from "../MainPageTemplate/GridComponent/GridComponent";
import IT1 from "../MainPageTemplate/IT-Ct1/IT1";
import IT3 from "../MainPageTemplate/IT-Ct1/IT3";
import IT4 from "../MainPageTemplate/IT-Ct1/IT-CT4";
import IT5 from "../MainPageTemplate/IT-Ct1/IT5";
import { resume } from "../../resume";
import { db } from "../../firebaseConfig";
import Tesseract from "tesseract.js";
import axios from "axios";
import { FaAward, FaBook } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  MdOutlinePermContactCalendar,
  MdWorkspacePremium,
} from "react-icons/md";
import { SiStudyverse } from "react-icons/si";
import { GiSkills } from "react-icons/gi";

const EditorResume = ({ id }) => {
  const router = useRouter();
  const editorRef = useRef(null);
  const pdfRef = useRef(null); // Ensure pdfRef is defined here
  const [uploadedText, setUploadedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [fontFamily, setFontFamily] = useState("Serif");
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);
  const [section, setSection] = useState(true);
  const [sections, setSections] = useState(false);
  const [template, setTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState("Education");
  const [filteredResume, setFilteredResume] = useState(null);
  const [sectionVisibility, setSectionVisibility] = useState({
    contactInfo: true,
    education: true,
    workExperience: true,
    awards: true,
    skills: true,
    certification: true,
  });
  const [currentColor, setCurrentColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeButton, setActiveButton] = useState("b2");
  const colors = [
    "#8B0000",
    "#FF4500",
    "#FFD700",
    "#006400",
    "#008B8B",
    "#4B0082",
    "#8B008B",
    "#2E8B57",
    "#00008B",
    "#2F4F4F",
  ];

  // Save resume to firestore
  const saveResumeToFirestore = async (resumeId, resumeContent) => {
    if (!user) return;

    const userDocRef = doc(db, "userAdmin", user.uid);

    try {
      const data = await updateDoc(userDocRef, {
        resumes: arrayUnion({ resume: resumeContent, resumeId }),
      });
      console.log(data, "resume data is stored");
    } catch (error) {
      console.error("Error saving resume to Firestore:", error);
      toast.error(
        "Error saving resume to Firestore. Check console for details."
      );
    }
  };

  useEffect(() => {
    const resumeItem = resume.find((item) => item.id === id);
    setFilteredResume(resumeItem);
  }, [id]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      setIsTextSelected(selection && selection.toString().length > 0);
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const applyFormat = (command) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        const span = document.createElement("span");
        span.innerHTML = selectedText;
        let needsFormatting = false;

        // Check current formatting
        const existingStyle = range.startContainer.parentNode.style;

        if (command === "bold") {
          if (existingStyle.fontWeight === "bold") {
            span.style.fontWeight = "normal"; // Remove bold
          } else {
            span.style.fontWeight = "bold"; // Apply bold
            needsFormatting = true;
          }
        } else if (command === "italic") {
          if (existingStyle.fontStyle === "italic") {
            span.style.fontStyle = "normal"; // Remove italic
          } else {
            span.style.fontStyle = "italic"; // Apply italic
            needsFormatting = true;
          }
        } else if (command === "underline") {
          if (existingStyle.textDecoration === "underline") {
            span.style.textDecoration = "none"; // Remove underline
          } else {
            span.style.textDecoration = "underline"; // Apply underline
            needsFormatting = true;
          }
        }

        // Apply font family if needed
        span.style.fontFamily = fontFamily;

        range.deleteContents();
        range.insertNode(span);

        // Collapse the range to the end of the newly inserted node
        range.collapse(false);
      }
    }
  };

  const handleFontChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleAddSection = (sectionType) => {
    dispatch(addSection(sectionType));
    setSectionVisibility((prev) => ({ ...prev, [sectionType]: true }));
  };

  const handleRemoveSection = (sectionType) => {
    dispatch(removeSection(sectionType));
    setSectionVisibility((prev) => ({ ...prev, [sectionType]: false }));
  };

  const handleClick = (id) => {
    dispatch(setResumeId(id));
  };

  // Download pdf
  const handleDownloadPDF = async () => {
    if (!user) {
      toast.error("You must be logged in to download your resume.");
      return;
    }
    setLoading(true);
    try {
      const element = pdfRef.current;
      if (!element) {
        console.error("No valid element found for PDF generation.");
        toast.error("Unable to generate PDF. Element not found.");
        return;
      }

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // Increase the scale for higher resolution
      });

      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const yOffset = 0; // Start at the top of the page

      pdf.addImage(imgData, "JPEG", 0, yOffset, imgWidth, pageHeight);
      pdf.save("my_resume.pdf");

      const resumeContent = element.innerHTML; // Capture the HTML content of the resume
      await saveResumeToFirestore(id, resumeContent);

      // OCR using Tesseract.js
      Tesseract.recognize(
        canvas, // Pass the canvas directly
        "eng", // Language to use
        {
          logger: (m) => console.log(m), // Optional logger to monitor the OCR process
        }
      )
        .then(async ({ data: { text } }) => {
          console.log("Extracted text:", text); // Log the extracted text in the console

          const mistakes = "Education : score 100";
          try {
            const response = await axios.post("/api/preview-analysis", {
              resumeText: text,
              mistakes: mistakes,
            });

            const analysis = response.data.analysis;
            console.log("Analysis result:", analysis);
            // Do something with the analysis result
          } catch (error) {
            console.error("Error calling analysis API:", error);
            toast.error(
              "Error analyzing resume text. Check console for details."
            );
          }
        })
        .catch((error) => {
          console.error("Error extracting text with Tesseract.js:", error);
          toast.error("Error extracting text. Check console for details.");
        });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: "Contact", key: "contactInfo" },
    { label: "Education", key: "education" },
    { label: "Work Experience", key: "workExperience" },
    { label: "Awards", key: "awards" },
    { label: "Skills", key: "skills" },
    { label: "Certificates", key: "certification" },
  ];

  // Preview
  const preview = () => {
    console.log("preview");
    router.push("/preview");
  };

  const changeOriginal = () => {
    dispatch(resetColor());
    setCurrentColor("#fff"); // Reset color state
  };

  const changeColor = (color) => {
    dispatch(setColor(color));
    setCurrentColor(color); // Update the current color state
  };

  const handleClickk = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      {" "}
      <div className={styles.topbar}>
        <div className={styles.topbarContent}>
          <div
            className={styles.slider}
            style={{
              transform:
                activeButton === "b1" ? "translateX(-25%)" : "translateX(105%)",
            }}
          ></div>
          <div
            onClick={() => {
              setSection(false);
              setTemplate(true);
              handleClickk("b1");
            }}
            // className={`${styles.b1} ${template && styles.clicked}`}
            className={`${styles.b1} ${
              activeButton === "b1" ? styles.active : ""
            }`}
          >
            Templates
          </div>
          <div
            onClick={() => {
              setSection(true);
              setTemplate(false);
              handleClickk("b2");
            }}
            // className={`${styles.b2} ${section && styles.clicked}`}
            className={`${styles.b2} ${
              activeButton === "b2" ? styles.active : ""
            }`}
          >
            Sections
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {section && (
          <div className={styles.leftSection}>
            <div
              onClick={() => setSections((prev) => !prev)}
              className={styles.sectionHeader}
            >
              <h4
                style={{
                  textAlign: "left",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                Sections
              </h4>
              <div>{sections ? "▲" : "▼"}</div>
            </div>
            <div className={`${styles.tabMenu} ${sections ? styles.open : ""}`}>
              {sections && (
                <ul className={styles.tabList}>
                  {tabs.map(({ label, key }, i) => (
                    <li
                      key={key}
                      className={`${styles.tabItem} ${
                        activeTab === key ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab(key)}
                    >
                      <ul
                        className={styles.tabHeader}
                        style={{ listStyle: "none" }}
                      >
                        <li>
                          {i === 0 ? (
                            <MdOutlinePermContactCalendar
                              style={{ marginRight: "0.8rem" }}
                            />
                          ) : i === 1 ? (
                            <SiStudyverse style={{ marginRight: "0.8rem" }} />
                          ) : i === 2 ? (
                            <MdWorkspacePremium
                              style={{ marginRight: "0.8rem" }}
                            />
                          ) : i === 3 ? (
                            <FaAward style={{ marginRight: "0.8rem" }} />
                          ) : i === 4 ? (
                            <GiSkills style={{ marginRight: "0.8rem" }} />
                          ) : (
                            <FaBook style={{ marginRight: "0.8rem" }} />
                          )}
                          {label}
                        </li>
                        <div className={styles.actions}>
                          {sectionVisibility[key] ? (
                            <button onClick={() => handleRemoveSection(key)}>
                              -
                            </button>
                          ) : (
                            <button onClick={() => handleAddSection(key)}>
                              +
                            </button>
                          )}
                        </div>
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <div className={styles.rightSection}>
          {/* <h3 style={{ textAlign: "center", color: "white" }}>My Resume</h3> */}
          {filteredResume && filteredResume.comp && (
            <div
              id="resume-template"
              ref={pdfRef}
              className={styles.resume}
              style={{ fontFamily: fontFamily }}
              contentEditable
              suppressContentEditableWarning={true}
            >
              {filteredResume.comp}
            </div>
          )}

          <div className={styles.dwn_btn}>
            <button
              className="nav-btn"
              style={{ color: "white", border: "none" }}
              // onClick={handleDownloadPDF}
              onClick={() => {
                preview();
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                <>
                  {/* Download{" "}
                <img src="/download.png" width="20px" alt="Download icon" /> */}
                  Preview
                </>
              )}
            </button>
          </div>
          <Toaster />
        </div>
        {section && (
          <div className={styles.editSection}>
            <div className={styles.toolbar}>
              <p>Typography</p>
              <select
                className={styles.fontDropdown}
                value={fontFamily}
                onChange={handleFontChange}
              >
                <option value="Serif">Serif</option>
                <option value="Sans-serif">Sans-serif</option>
                <option value="Monospace">Monospace</option>
                {/* Add more font options as needed */}
              </select>
              <div className={styles.rightIcons}>
                <button
                  onClick={() => applyFormat("bold")}
                  disabled={!isTextSelected}
                  className={`${styles.icon} ${styles.textBold}`}
                >
                  B
                </button>
                <button
                  onClick={() => applyFormat("italic")}
                  disabled={!isTextSelected}
                  className={`${styles.icon} ${styles.textItalic}`}
                >
                  I
                </button>
                <button
                  onClick={() => applyFormat("underline")}
                  disabled={!isTextSelected}
                  className={`${styles.icon} ${styles.textUnderline}`}
                >
                  U
                </button>
              </div>
            </div>
            <div className={styles.color}>
              <div>
                <h6 className={styles.h6}>Color</h6>
                <div className={styles.border}></div>
              </div>
              <div className={styles.color_main}>
                <div>
                  <img
                    src="/newIm/none.png"
                    alt="Reset Color"
                    onClick={changeOriginal}
                  />
                </div>
                <div className={styles.gridContainer}>
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={styles.circle}
                      style={{ backgroundColor: color, cursor: "pointer" }}
                      onClick={() => changeColor(color)}
                    ></div>
                  ))}
                  <p
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/color-picker.png"
                      alt="Show Color Palette"
                      style={{ width: "2rem", filter: "invert(1)" }}
                    />
                  </p>
                  {showColorPicker && (
                    <div className={styles.colorPickerWrapper}>
                      <ChromePicker
                        color={currentColor} // Use current color state
                        onChangeComplete={(color) => changeColor(color.hex)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        )}
        {template && (
          <div className={styles.endSection}>
            <div className={styles.h3}>Templates</div>
            <GridComponent>
              <div
                className={`${styles.pre2} pre2`}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <div
                  className={styles.overlay}
                  onClick={() => handleClick(3)}
                />
                <IT3 />
              </div>

              <div
                className={`${styles.pre2} pre2`}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <div
                  className={styles.overlay}
                  onClick={() => handleClick(4)}
                />
                <IT4 />
              </div>

              <div
                className={`${styles.pre2} pre2`}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <div
                  className={styles.overlay}
                  onClick={() => handleClick(1)}
                />
                <IT1 />
              </div>

              <div
                className={`${styles.pre2} pre2`}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <div
                  className={styles.overlay}
                  onClick={() => handleClick(5)}
                />
                <IT5 />
              </div>
            </GridComponent>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorResume;
