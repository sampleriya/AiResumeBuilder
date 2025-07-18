import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Tesseract from "tesseract.js";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeSection from "./ResumeSection";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AnalysisSection from "./AnalysisSection";
import styles from "./Preview.module.css";
import { resume } from "../../resume";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Resume from "../MainPageTemplate/IT-Ct1/IT1";

const Preview = ({ id }) => {
  const [filteredResume, setFilteredResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coverLetterLoading, setCoverLetterLoading] = useState(false); // New state for cover letter loading
  const [analysisResult, setAnalysisResult] = useState(null);
  const pdfRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCover, setIsCover] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [user, setUser] = useState(null);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const saveResumeToFirestore = async (resumeId, resumeContent) => {
    if (!user) return;

    const userDocRef = doc(db, "userAdmin", user.uid);

    try {
      await updateDoc(userDocRef, {
        resumes: arrayUnion({ resume: resumeContent, resumeId }),
      });
      console.log("Resume data is stored");
    } catch (error) {
      console.error("Error saving resume to Firestore:", error);
      toast.error(
        "Error saving resume to Firestore. Check console for details."
      );
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const resumeItem = resume.find((item) => item.id === id);
    setFilteredResume(resumeItem);
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!user) {
      toast.error("You must be logged in to download your resume.");
      handleModalClose();
      return;
    }
    console.log(isCover, "cover boolean");

    try {
      const resumeElement = document.querySelector(`.${styles.resume}`);
      const previewElement = pdfRef.current;

      if (!previewElement || !resumeElement) {
        console.error("No valid element found for PDF generation.");
        toast.error("Unable to generate PDF. Element not found.");
        return;
      }

      const clonedElement = resumeElement.cloneNode(true);
      clonedElement.style.zoom = "1";
      clonedElement.style.position = "absolute";
      clonedElement.style.top = "-9999px";
      clonedElement.style.left = "-9999px";

      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("my_resume.pdf");
      const resumeContent = previewElement.innerHTML; // Capture the HTML content of the resume
      await saveResumeToFirestore(id, resumeContent);

      handleModalClose();
      toast.success("Resume Downloaded Successfully");

      document.body.removeChild(clonedElement);
    } catch (error) {
      console.error("Error generating PDF or extracting text:", error);
      toast.error(
        "Error generating PDF or extracting text. Check console for details."
      );
    } finally {
      if (isCover) {
        setCoverLetterLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Resume with cover letter

  const handleResumeWithCoverLetter = async () => {
    if (!user) {
      toast.error(
        "You must be logged in to download your resume with cover letter."
      );
      handleModalClose();
      return;
    }
    setIsCover(true);
    try {
      const resumeElement = document.querySelector(`.${styles.resume}`);
      const previewElement = pdfRef.current;

      if (!previewElement || !resumeElement) {
        console.error("No valid element found for PDF generation.");
        toast.error("Unable to generate PDF. Element not found.");
        return;
      }

      // Clone the resume element to avoid altering the original
      const clonedElement = resumeElement.cloneNode(true);
      clonedElement.style.zoom = "1";
      clonedElement.style.position = "absolute";
      clonedElement.style.top = "-9999px";
      clonedElement.style.left = "-9999px";

      document.body.appendChild(clonedElement);

      // Generate a canvas from the cloned element
      const canvas = await html2canvas(clonedElement, {
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the resume image to the PDF
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("my_resume.pdf");
      const resumeContent = previewElement.innerHTML; // Capture the HTML content of the resume
      await saveResumeToFirestore(id, resumeContent);

      // Extract text from the image using Tesseract.js
      const {
        data: { text },
      } = await Tesseract.recognize(imgData, "eng", {
        logger: (m) => console.log(m),
      });

      console.log("Extracted text:", text);

      // Generate the cover letter using the extracted text
      const response = await axios.post("/api/generate-cover-letter", {
        resumeText: text,
      });

      console.log("Cover letter response:", response.data);

      if (response.data) {
        let coverLetterText = response.data.coverLetterText;

        // Generate and download the cover letter PDF
        const coverLetterDoc = new jsPDF();
        const pageWidth = coverLetterDoc.internal.pageSize.getWidth();
        const margin = 10;
        const maxLineWidth = pageWidth - margin * 2;
        const textLines = coverLetterDoc.splitTextToSize(
          coverLetterText,
          maxLineWidth
        );

        coverLetterDoc.text(textLines, margin, 10);
        coverLetterDoc.save("cover_letter.pdf");

        toast.success("Resume and Cover Letter Downloaded Successfully");
      } else {
        console.error("Cover letter text is empty in the API response.");
      }

      handleModalClose();
      document.body.removeChild(clonedElement);
    } catch (error) {
      console.error("Error generating PDF or extracting text:", error);
      toast.error(
        "Error generating PDF or extracting text. Check console for details."
      );
    } finally {
      setIsCover(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const element = pdfRef.current;
      if (!element) {
        console.error("No valid element found for PDF generation.");
        toast.error("Unable to generate PDF. Element not found.");
        return;
      }

      const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL("image/jpeg");

      Tesseract.recognize(canvas, "eng", { logger: (m) => console.log(m) })
        .then(async ({ data: { text } }) => {
          console.log("Extracted text:", text);

          let mistakes = localStorage.getItem("resumeAnalysis") || "";

          const response = await axios.post("/api/preview-analysis", {
            resumeText: text,
            mistakes: mistakes,
          });

          const analysis = response.data.analysis;
          console.log("Analysis result:", analysis);
          localStorage.setItem("resumeAnalysis", JSON.stringify(analysis));

          setAnalysisResult(analysis);
          setIsAnalyzing(false);
        })
        .catch((error) => {
          console.error("Error extracting text with Tesseract.js:", error);
          toast.error("Error extracting text. Check console for details.");
        });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF. Check console for details.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left}>
          <div>
            <h6>Preview</h6>
            <div className={styles.border}></div>
            <div className={styles.resume}>
              {filteredResume && filteredResume.comp && (
                <>
                  <div className={styles.overlay} />

                  <div id="resume-template" ref={pdfRef}>

                    {filteredResume.comp}
                  </div>
                </>
              )}
            </div>

            <div className={styles.buttons}>
              <button
                className="nav-btn"
                style={{
                  border: "1px solid var(--optionalColor)",
                  color: "black",
                  backgroundColor: "white",
                }}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <CircularProgress size={24} style={{ color: "black" }} />
                ) : (
                  "Analyze"
                )}
              </button>
              <button
                className="nav-btn"
                style={{
                  color: "white",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleModalOpen}
                disabled={loading || coverLetterLoading}
              >
                Download
                <img src="/download.png" width="20px" alt="Download icon" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {analysisResult ? (
            <AnalysisSection analysis={analysisResult} />
          ) : (
            <ResumeSection />
          )}
        </div>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleModalClose}>
                &times;
              </button>
              <p className={styles.modalTitle}>
                Please select your preferred format for downloading
              </p>
              <div className={styles.buttonContainer}>
                {loading || isCover ? (
                  <div style={{display:"flex", justifyContent:"center"}}> 
                  <CircularProgress size={24} style={{ color: "black" }} />

                  </div>
                ) : (
                  <div className={styles.btn_div}>
                    <button
                      className={styles.secondaryButton}
                      onClick={handleResumeWithCoverLetter}
                    >
                      Resume + Cover Letter
                    </button>
                    <button
                      className={styles.primaryButton}
                      onClick={() => {
                        setIsCover(false);
                        handleDownloadPDF();
                      }}
                      // style={{ marginLeft: "10px" }}
                    >
                      Download Resume
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Preview;
