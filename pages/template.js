'use client'
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../store"; // Adjust the path accordingly
import { RingLoader } from "react-spinners"; // Import RingLoader from react-spinners
import { setCategory } from '../store'; // Import the setCategory action
import mammoth from "mammoth";


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Template = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resumeDataIT3);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const images = [
    { img: "/template/img1.png", description: "IT" },
    { img: "/template/img2.png", description: "Finance" },
    { img: "/template/img3.png", description: "Healthcare" },
  ];

  const handleTabClick = (tabName) => {
    // setActiveTab(tabName);
    dispatch(setCategory(tabName)); // Dispatch the setCategory action
  };

  // Filter templates based on search query
  const filteredImages = images.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsUploading(true);
  
    try {
      let extractedText = "";
  
      // Detect file type by extension
      const fileExtension = file.name.split(".").pop().toLowerCase();
  
      if (fileExtension === "pdf") {
        // Handle PDF file upload
        const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
        const pdf = await loadingTask.promise;
  
        // Extract text from PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          extractedText += pageText;
        }
  
        // Fallback to OCR if no text is extracted
        if (!extractedText.trim()) {
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
      } else if (fileExtension === "docx" || fileExtension === "doc") {
        // Handle DOCX file upload using mammoth.js for text extraction
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value; // Extracted text from the DOCX file
  
        if (!extractedText.trim()) {
          console.warn("No text extracted from DOCX, consider fallback logic.");
        }
      } else {
        throw new Error("Unsupported file format. Please upload a PDF or DOC/DOCX file.");
      }
      
      // Clean up the extracted text to only contain numbers and alphabets, and remove extra spaces
      extractedText = extractedText
        .replace(/[^a-zA-Z0-9\s]/g, "")  // Remove non-alphanumeric characters
        .replace(/\s+/g, " ")            // Replace multiple spaces with a single space
        .trim();                         // Remove leading and trailing spaces
  
      // Send cleaned extracted text to the backend
      const response = await axios.post("/api/user-resume", {
        resumeText: extractedText,
      });
  
      if (response.data) {
        console.log("Raw response data:", response.data);
  
        let resumeData = response.data;
        dispatch(setResumeDataIT3(resumeData));
  
        console.log(typeof resumeData, "data is here"); // "object"
        console.log(resumeData instanceof Object, "is resume an object?"); // true
        setShowTemplates(true);
      }
  
      // Handle response
      toast.success("Resume uploaded and processed successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the resume.");
    } finally {
      setIsUploading(false);
    }
};


  return (
    <>
      <Head>
        <title>Resume Templates | Corporate Gate</title>
        <meta
          name="description"
          content="Explore various resume templates to create a professional resume that suits your needs. Corporate Gate offers a range of resume styles including Chronological, Functional, and Creative templates."
        />
        <meta
          name="keywords"
          content="resume templates, chronological resume, functional resume, hybrid resume, creative resume, modern resume"
        />
        <meta property="og:title" content="Resume Templates | Corporate Gate" />
        <meta
          property="og:description"
          content="Explore various resume templates to create a professional resume that suits your needs. Corporate Gate offers a range of resume styles including Chronological, Functional, and Creative templates."
        />
      </Head>
      <div className="template-container">
        <div className="sidebar"></div>
        {isUploading ? (
          <div
            className="loader-container"
            style={{
              height: "60vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RingLoader color="var(--optionalColor)" />
          </div>
        ) : !showTemplates ? (
          <div className="loaderContainer">
            <button
              onClick={() => setShowTemplates(true)}
              className="default-btn d-btn"
              style={{
                background: "var(--optionalColor)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px 30px",
                gap: "0.6rem", // Added gap for spacing between icon and text
                border: "none", // Optional: Removes default border
                borderRadius: "5px", // Optional: Adds rounded corners
              }}
            >
              <img src="/up-3.png" style={{filter:"invert(1)", width:"1.2rem"}}/>
              Create Resume
            </button>

            <label
              htmlFor="upload-resume"
              className="default-btn"
              style={{
                background: "#fff",
                border: "1px solid var(--optionalColor)",
                color: "black",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.6rem",
                padding: "10px 30px",
              }}
            >
              <img src="/upload.png" style={{ width: "1.5rem" }} />
              Upload Resume
            </label>
            <input
              id="upload-resume"
              type="file"
              // accept=".pdf"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          <div
            className="template"
            style={{
              transform: showTemplates ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <h1>Resumes</h1>
            <div className="template-grid">
              {filteredImages.map((item, i) => (
                <Link
                  href="/category-template"
                  key={i}
                  style={{ cursor: "pointer" }}
                >
                  <div className="template-item" onClick={()=>{
                    handleTabClick(item.description)
                  }}>
                    <img src={item.img} alt={item.description} />
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Template;
