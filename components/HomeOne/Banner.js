import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { jsPDF } from "jspdf";
import Link from "next/link";
import Chatbot from "../Chatbot/Chatbot";
import Tesseract from "tesseract.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast, Toaster } from "react-hot-toast";

// Set workerSrc to point to the correct worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const Banner = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user);
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [defaultBtn, setDefaultBtn] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");

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
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const textLines = doc.splitTextToSize(coverLetterText, maxLineWidth);

    doc.text(textLines, margin, 10);
    doc.save("cover_letter.pdf");
  };

  const handleFileUpload = async (event) => {
    if (!user) {
      toast.error("You Need To login!");
      return;
    }
    const file = event.target.files[0];
    setFileName(file.name); // Set the file name
    setIsUploading(true);

    try {
      const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
      const pdf = await loadingTask.promise;
      let extractedText = "";

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

      const response = await axios.post("/api/generate-cover-letter", {
        resumeText: extractedText,
      });

      setCoverLetterText(response.data.coverLetterText);
      setUploadProgress(100);
      setCoverLetterGenerated(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while generating the cover letter.");
    } finally {
      // setIsUploading(false);
    }
  };
  const handleToggleClick = () => {
    setIsClicked(!isClicked);
  };


  const resetUploadState = () => {
    setUploadProgress(0);
    setIsUploading(false);
    setDefaultBtn(false);
    setCoverLetterGenerated(false);
    setFileName("");
  };

  return (
    <>
      <Toaster />
      {isClicked ? (
        <div onClick={() => setIsClicked((prev) => !prev)}>
          <div className="go-down hide-on-mobile">
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>
      ) : (
        <div className="chat-bot">
          <img
            src="/bot-3.png"
            style={{ cursor: "pointer" }}
            onClick={() => setIsClicked((prev) => !prev)}
          />
        </div>
      )}

      {/* {isClicked && <Chatbot />} */}
      {isClicked && <Chatbot onClose={handleToggleClick} />}
      <div
        className="main-banner-area"
        style={{
          paddingTop: "10rem",
          paddingBottom: "10rem",
          fontFamily: "var(--fontFamily3)",
        }}
      >
        <div className="container">
          <div className="main-banner-box" style={{maxWidth:"450px"}}>
            <img
              src="/re-1.svg"
              alt="eg-template"
              style={{ height: "auto" , width:"100%",}}
            />
          </div>

          <div className="row align-items-center m-0">
            <div className="col-xl-6 col-lg-6 col-md-12 p-0">
              <div className="main-banner-content">
                <p
                  style={{
                    padding: "0",
                    margin: "0",
                    color: "black",
                    fontWeight: "bolder",
                  }}
                >
                  AI resume builder
                </p>
                <h1
                  style={{
                    fontWeight: "400",
                    fontFamily: "var(--fontFamily4)",
                  }}
                >
                  Your Success Story Begins with a Resume
                </h1>
                <p>
                  Quickly create a stunning resume and make a great impression
                  on your future employer with a professionally designed resume
                  in minutes.
                </p>

                <Link href="/template" className="default-btn">
                  <i className="bx bxs-user"></i> Create My Resume
                </Link>
                {/* <p>Trusted My Millions of Company</p> */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12 p-0">
              <div className="main-banner-image">
                {/* <img src="/images/banner/banner-img1.png" alt="image" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Shape Images */}
        <div className="shape1">
          {/* <img src="/images/shape/shape1.png" alt="image" /> */}
          <img src="/ex.png" alt="image" />
        </div>
        <div className="shape2">
          {/* <img src="/images/shape/shape2.png" alt="image" /> */}
          {/* <img src="/ex-2.png" alt="image" /> */}
        </div>
        <div className="shape3">
          {/* <img src="/images/shape/shape3.png" alt="image" /> */}
          <img src="/ex-4.png" alt="image" />
        </div>
        <div className="shape5">
          {/* <img src="/bg-home.png" alt="image" style={{ width: "100%" }} /> */}
          <img src="/images/shape/shape5.png" alt="image" />
        </div>
        <div className="shape9">
          {/* <img src="/images/shape/shape9.png" alt="image" /> */}
          <img src="/ex-3.png" alt="image" />
        </div>
      </div>
    </>
  );
};

export default Banner;
