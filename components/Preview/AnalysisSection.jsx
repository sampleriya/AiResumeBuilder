"use client";
import React, { useState, useEffect } from "react";
import styles from "./AnalysisSection.module.css"; // Importing the CSS module
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import { useRouter } from "next/router";

const AnalysisSection = ({ analysis }) => {
  const router = useRouter()
  const handleRoute = ()=>{
    console.log("navigation is pushed")
    router.push("/editor")
  }
  const { Education, Contact, Skills, Experience, Interests } = analysis;
  console.log(analysis, "result is here");

  // State to manage the total score
  const [totalScore, setTotalScore] = useState(0);

  // Effect to recalculate the score whenever the analysis data changes
  useEffect(() => {
    const calculateTotalScore = () => {
      const sectionScores = [
        Education.score,
        Contact.score,
        Skills.score,
        Experience.score,
        Interests.score, // Include Interests score
      ];
      const totalScore =
        sectionScores.reduce((acc, score) => acc + score, 0) /
        sectionScores.length;
      setTotalScore(totalScore);
    };

    calculateTotalScore();
  }, [Education, Contact, Skills, Experience, Interests]); // Dependencies to recalculate when any section data changes

  // Helper function to render mistakes, only if there are mistakes
  const renderMistakes = (sectionData) => {
    const { bigMistakes, mediumMistakes, smallMistakes } = sectionData;

    // Check if there are any mistakes at all
    if (
      bigMistakes.length === 0 &&
      mediumMistakes.length === 0 &&
      smallMistakes.length === 0
    ) {
      return null; // No mistakes to display, return null
    }

    return (
      <>
        {bigMistakes.map((mistake, index) => (
          <div key={index} className={styles.mistake}>
            <img src="/er.png" alt="error" />
            <p>{mistake}</p>
          </div>
        ))}
        {mediumMistakes.map((mistake, index) => (
          <div key={index} className={styles.mistake}>
            <img src="/er.png" alt="error" />
            <p>{mistake}</p>
          </div>
        ))}
        {smallMistakes.map((mistake, index) => (
          <div key={index} className={styles.mistake}>
            <img src="/er.png" alt="error" />
            <p>{mistake}</p>
          </div>
        ))}
      </>
    );
  };

  return (
    <section className={styles.container}>
      <img
        src="/pre-1.png"
        alt="Background Image 1"
        className={styles.backgroundImage1}
      />
      <img
        src="/pre-2.png"
        alt="Background Image 2"
        className={styles.backgroundImage2}
      />
      <h3 className={styles.heading}>Quick Analysis</h3>

      {/* Conditionally render sections based on the existence of mistakes */}
      {renderMistakes(Education) && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Education</h4>
          </div>
          {renderMistakes(Education)}
        </div>
      )}

      {renderMistakes(Contact) && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Contact</h4>
          </div>
          {renderMistakes(Contact)}
        </div>
      )}

      {renderMistakes(Experience) && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Work Experience</h4>
          </div>
          {renderMistakes(Experience)}
        </div>
      )}

      {renderMistakes(Skills) && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Skills</h4>
          </div>
          {renderMistakes(Skills)}
        </div>
      )}

      {renderMistakes(Interests) && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Interests</h4>
          </div>
          {renderMistakes(Interests)}
        </div>
      )}

      <div className={styles.scoreSection}>
        <p style={{ display: "flex", alignItems: "center" , justifyContent:"center"}}>
          You Are{" "}
          <span style={{ width: 60, height: 60, margin: "0 10px" }}>
            <CircularProgressbar
              value={totalScore}
              text={`${totalScore.toFixed(0)}%`}
              styles={buildStyles({
                pathColor: "#00A79D", // Customize the progress bar color
                textColor: "#000", // Customize the text color
              

                trailColor: "#d6d6d6", // Customize the background trail
              })}
            />
          </span>{" "}
          There
        </p>
        <button className={styles.editButton} onClick={handleRoute}>Edit</button>

      </div>
    </section>
  );
};

export default AnalysisSection;
