import React, { useContext, useState, useMemo, useEffect } from "react";
import PercentageBar from "../ResumeAnalysis/PercentageBar/PercentageBar";
import { ResumeAnalysisContext } from "../../context/ResumeAnalysisContext";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled
const Slider = dynamic(() => import("react-slick"), { ssr: false });
const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });
const { DocViewerRenderers } = dynamic(() => import("react-doc-viewer"), {
  ssr: false,
});
const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);
const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false }
);

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ResumeAnalyze = () => {
  const fileType = useSelector((state) => state.fileType);
  const { analysis } = useContext(ResumeAnalysisContext);
  const [selectedSection, setSelectedSection] = useState("Education");
  const [docViewerKey, setDocViewerKey] = useState(0);

  const sections = useMemo(
    () => [
      { label: "Education", percentage: analysis?.Education?.score || 0 },
      { label: "Contact", percentage: analysis?.Contact?.score || 0 },
      { label: "Skills", percentage: analysis?.Skills?.score || 0 },
      { label: "Experience", percentage: analysis?.Experience?.score || 0 },
      { label: "Interests", percentage: analysis?.Interests?.score || 0 },
    ],
    [analysis]
  );

  const getMistakesForSection = (section) => {
    if (!analysis || !analysis[section]) return [];
    return [
      ...(analysis[section]?.smallMistakes || []),
      ...(analysis[section]?.mediumMistakes || []),
      ...(analysis[section]?.bigMistakes || []),
    ].filter((mistake) => mistake.trim() !== "");
  };

  const selectedMistakes = useMemo(
    () => getMistakesForSection(selectedSection),
    [selectedSection, analysis]
  );

  console.log(analysis?.resumeURL);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    arrows: true,
  };

  useEffect(() => {
    // Force re-render of DocViewer when analysis changes
    setDocViewerKey((prevKey) => prevKey + 1);
  }, [analysis]);

  return (
    <div>
      <div className="analyze-top">
        <h1>Analyze your Resume in Seconds</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {sections.map((section, index) => (
            <PercentageBar
              key={index}
              label={section.label}
              percentage={section.percentage}
              onClick={() => setSelectedSection(section.label)}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "2rem",
          border: "1px solid #CBCBCB",
        }}
      ></div>

      <div className="analyze-bottom">
        <div className="one">
          <div className="pdf-container">
            {analysis?.resumeURL ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
                <Viewer fileUrl={analysis?.resumeURL} />
              </Worker>
            ) : (
              <p>No pdf is uploaded</p>
            )}
          </div>
        </div>

        <div className="two">
          <div className="two_outer">
            <div className="bottom-flex" style={{ marginTop: "1rem" }}>
              <Slider {...sliderSettings}>
                {sections.map((section, index) => (
                  <div key={index} style={{ padding: "1rem" }}>
                    <h6
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: "500",
                        fontSize: "15px",
                        marginTop: "1rem",
                      }}
                    >
                      {section.label.toUpperCase()} MISTAKES
                      <img
                        src="/error.png"
                        style={{ width: "25px" }}
                        alt="Error icon"
                      />
                    </h6>
                    <div
                      style={{ border: "1px solid #D1D1D1", width: "70%" }}
                    ></div>

                    <div>
                      {getMistakesForSection(section.label).map(
                        (mistake, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#565656",
                                flexShrink: 0,
                              }}
                            ></div>
                            <div
                              style={{
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                              }}
                            >
                              {mistake}
                            </div>
                          </div>
                        )
                      )}
                      {getMistakesForSection(section.label).length === 0 && (
                        <p>No mistakes found.</p>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyze;
