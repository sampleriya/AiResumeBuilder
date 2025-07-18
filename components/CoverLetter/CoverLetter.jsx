"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";
import Tesseract from "tesseract.js";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { Toaster, toast } from "react-hot-toast"; // Import Toaster and toast
import { auth } from "../../firebaseConfig";
import mammoth from "mammoth";

// Set workerSrc to point to the correct worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CoverLetter = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [defaultBtn, setDefaultBtn] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState(""); // Store cover letter text here
  const [text, setText] = useState("");

const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user);
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prev + 5, 100);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  // Function to extract text from PDF
  const extractTextFromPDF = async (file) => {
    try {
      const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
      const pdf = await loadingTask.promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText;
      }

      return text;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error("Failed to extract text from PDF");
    }
  };

  const handleFileUpload = async (event) => {
    if (!user) {
      toast.error("You need to login to Generate Cover Letter!");
      return;
    }
    
    const file = event.target.files[0];
    setFileName(file.name); // Set the file name
    setIsUploading(true);
  
    try {
      let extractedText = "";
      const fileType = file.type;
  
      if (fileType === 'application/pdf') {
        // Handle PDF files
        const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
        const pdf = await loadingTask.promise;
  
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          extractedText += pageText;
        }
  
        if (!extractedText.trim()) {
          // If no text extracted, fall back to OCR
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
  
            canvas.width = viewport.width;
            canvas.height = viewport.height;
  
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
  
            await page.render(renderContext).promise;
  
            const imageData = canvas.toDataURL("image/png");
  
            const result = await Tesseract.recognize(imageData, "eng", {
              logger: (m) => console.log(m),
            });
  
            extractedText += result.data.text;
          }
        }
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword') {
        // Handle DOCX and DOC files
        const arrayBuffer = await file.arrayBuffer();
  
        if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ arrayBuffer });
          extractedText = result.value;
        } else if (fileType === 'application/msword') {
          // For DOC files, consider using a different library or service
          // Mammoth does not support DOC files, so you'll need another approach for DOC
          extractedText = "DOC file support is not implemented"; // Placeholder
        }
      } else {
        throw new Error("Unsupported file type");
      }
  
      const response = await axios.post("/api/generate-cover-letter", {
        resumeText: extractedText,
      });
  
      setCoverLetterText(response.data.coverLetterText);
      setUploadProgress(100);
      setCoverLetterGenerated(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while generating the cover letter.");
    } finally {
      // setIsUploading(false);
    }
  };
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const textLines = doc.splitTextToSize(coverLetterText, maxLineWidth);

    doc.text(textLines, margin, 10);
    doc.save("cover_letter.pdf");
  };

  const resetUploadState = () => {
    setUploadProgress(0);
    setIsUploading(false);
    setDefaultBtn(false);
    setCoverLetterGenerated(false);
    setFileName("");
    setCoverLetterText(""); // Reset cover letter text
  };

  return (
    <div className="cl-container">
      <Toaster/>
      <div className="cl-1">
        <h1>Get Your Cover Letter</h1>
        <p>
          Get AI-powered generated cover letter through your resume in just one
          simple click and get your cover letter in your hands
        </p>

        {!isUploading && !coverLetterGenerated && (
          <label
            className="coinbaseBtn"
            style={{
              cursor: "pointer",
              backgroundColor: "var(--optionalColor)",
            }}
          >
            <img src="/upload.png" style={{ width: "30px", height: "auto" }} />
            <input
              type="file"
              // accept="application/pdf"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            Upload Resume
          </label>
        )}
        {isUploading && (
          <div
            className="upload-progress"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "5px",
              position: "relative",
              width: "fit-content",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "fit-content",
              }}
            >
              <img
                src="/images/image 16.png"
                style={{ width: "30px", height: "auto" }}
              />
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem",
                    gap: "40px",
                  }}
                >
                  <span>{fileName}</span>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#5466F9",
                    }}
                  >
                    {uploadProgress}%
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    position: "relative",
                    padding: "0 10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      background: "#e0e0e0",
                      borderRadius: "5px",
                      height: "2px",
                      overflow: "hidden",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: `${uploadProgress}%`,
                        background: "#3b82f6",
                        height: "100%",
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={resetUploadState}
              style={{
                background: "#ffffff",
                padding: "0 0.5rem",
                borderRadius: "100%",
                height: "fit-content",
                cursor: "pointer",
              }}
            >
              &times;
            </div>
          </div>
        )}
        {coverLetterGenerated ? (
          <a
            className="coinbaseBtn"
            onClick={handleDownload}
            style={{
              backgroundColor: "var(--optionalColor)",
              cursor: "pointer",
            }}
          >
            Download your Cover Letter
          </a>
        ) : (
          defaultBtn && (
            <a className="coinbaseBtn" style={{ backgroundColor: "#A1A1A1" }}>
              Download your Cover Letter
            </a>
          )
        )}
        <img src="/newimg/cl-1.png" alt="" className="cl-img" />
      </div>
      <div className="cl-2">
        <div style={{textAlign:"center", marginBottom:"7rem"}}>
          <h3>Generate your Cover Letter</h3>
          <h3>in Just Three Easy Steps</h3>
        </div>

        <img src="/Vector 33.png" alt="" className="cl-vector-img" />
        <div className="cl-desti-img">
          <img src="/cl-desti.png" alt="" className="cl-desti-img-position" />
          <div className="cl-centered">
            <div className="cl-div-1">
              <div className="login-cl-div1">
                <h6>Login or Sign up With</h6>
                <h6>your Email Account</h6>
                <div className="circle-cl">
                  <h2>1</h2>
                </div>
              </div>
              <div>
                <img src="/newimg/cl-2.png" alt="" className="cl-icon-bg" />
                {/* <img src="/image 18.png" alt="" className="cl-2-icon" /> */}
              </div>
            </div>
            <div className="cl-div-2">
              <div>
                <img src="/newimg/cl-3.png" alt="" className="cl-icon-bg" />
                {/* <img src="/image 19.png" alt="" className="cl-2-icon" /> */}
              </div>
              <div className="login-cl-div2">
                <h6>Upload Your Resume</h6>
                <div className="circle-cl2">
                  <h2>2</h2>
                </div>
              </div>
            </div>
            <div className="cl-div-1">
              <div className="login-cl-div2">
                <h6>Download</h6>
                <div className="circle-cl">
                  <h2>3</h2>
                </div>
              </div>
              <div>
                <img src="/newimg/cl-4.png" alt="" className="cl-icon-bg" />
                {/* <img src="/image 20.png" alt="" className="cl-2-icon" /> */}
              </div>
            </div>
          </div>

          <img
            src="/cl-desti.png"
            alt=""
            className="cl-desti-img-position-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
