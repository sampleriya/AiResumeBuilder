"use client";
import React, { useState, useContext, useEffect } from "react";
import { ResumeAnalysisContext } from "../../context/ResumeAnalysisContext";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useRouter } from "next/router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Tesseract from "tesseract.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import mammoth from "mammoth";
import { useDispatch } from "react-redux";
import { setFileType } from "../../store";
import { jsPDF } from "jspdf";
// import docxPdf from 'docx-pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const Header = () => {
  const { setAnalysis } = useContext(ResumeAnalysisContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);
  // const dispatch =

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (event) => {
    if (!user) {
      toast.error("You need to be logged in to upload a resume.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const fileExtension = file.name.split(".").pop().toLowerCase();

    try {
      let storageRef;
      let extractedText = "";

      if (file.type === "application/pdf") {
        // PDF handling code remains unchanged
        storageRef = ref(storage, `resumes/analyze/${file.name}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Extract text from PDF using PDF.js (as in your original code)
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          const loadingTask = pdfjsLib.getDocument({ data: typedarray });
          const pdf = await loadingTask.promise;

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const strings = content.items.map((item) => item.str);
            extractedText += strings.join(" ");
          }

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
              // router.push("/resumeanalysis");
            }
          }
          await processResumeText(extractedText, downloadURL);

          setIsUploading(false);
          toast.success("Resume uploaded and analyzed successfully!");

          router.push("/resumeanalysis");
        };
        fileReader.readAsArrayBuffer(file);
      } else if (fileExtension === "docx" || fileExtension === "doc") {
        // Extract text from DOCX using mammoth
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value.trim();

        if (!extractedText) {
          console.warn("No text extracted from DOCX");
          toast.error("Unable to extract text from the file.");
          setIsUploading(false);
          return;
        }

        // Create PDF using jsPDF
        const doc = new jsPDF();
        const fontSize = 12;
        const lineHeight = 0.5; // Reduce the line height to make lines closer together
        const marginLeft = 20;
        const marginTop = 30;
        const maxLineWidth = 170; // Maximum width for wrapping text in the PDF

        // Split text into lines that fit the page width
        doc.setFontSize(fontSize);

        const lines = doc.splitTextToSize(extractedText, maxLineWidth);

        let cursorY = marginTop;

        // Add each line to the PDF, adjusting the Y position for line spacing
        lines.forEach((line) => {
          doc.text(line, marginLeft, cursorY);
          cursorY += fontSize * lineHeight; // Control the space between lines, reduce line height for smaller gaps
        });

        // Convert the generated PDF to a Blob
        const pdfBlob = doc.output("blob");

        // Change the storage reference to use a .pdf extension
        const pdfFileName = file.name.replace(/\.(docx|doc)$/i, ".pdf");
        storageRef = ref(storage, `resumes/analyze/${pdfFileName}`);

        // Upload the PDF Blob to Firebase
        await uploadBytes(storageRef, pdfBlob);
        const pdfDownloadURL = await getDownloadURL(storageRef);

        await processResumeText(extractedText, pdfDownloadURL);
        toast.success("Resume uploaded and analyzed successfully!");

        router.push("/resumeanalysis");
      } else {
        toast.error(
          "Unsupported file format. Please upload a PDF or DOC/DOCX file."
        );
        setIsUploading(false);
        return;
      }
    } catch (error) {
      setIsUploading(false);

      toast.error("An error occurred during the upload process.");
      console.error(error);
    } finally {
    }
  };

  const processResumeText = async (text, downloadURL) => {
    try {
      const response = await fetch("/api/resume-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis({ ...data.analysis, resumeURL: downloadURL });

        // Redirect to the /resumeanalysis page
      } else {
        toast.error("Failed to analyze resume.");
      }
    } catch (error) {
      console.error("Error during resume analysis:", error);
      toast.error("Failed to analyze resume.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="custom-header">
      <div>
        <h1>Analyze your Resume</h1>
        <p>"Receive expert insights to enhance your resume and stand out."</p>
        <div
          className="custom-buttons"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <input
            type="file"
            // accept="application/pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="upload-input"
          />
          <label
            htmlFor="upload-input"
            className="custom-upload-btn"
            style={{}}
          >
            {isUploading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ClipLoader size={24} />
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src="/upload.png" alt="" style={{ width: "1.5rem" }} />
                  Upload Resume
                </div>
              </>
            )}
          </label>
          <Link href="/editor">
            <button
              style={{ border: "2px solid #00a79d", fontWeight: "bold" }}
              className="custom-create-btn"
            >
              Create Resume
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img src="/newimg/bg.png" alt="" className="img-head" />
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
