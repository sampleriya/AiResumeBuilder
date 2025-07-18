"use client"
import React, { useState } from "react";
import styles from "./Skills.module.css";

const SkillMatching = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTemplate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-skillset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills);
      } else {
        console.error("Failed to fetch skillsets");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["template-container"]}>
      <div className={styles.sidebar}></div>
      <div className={styles.skill}>
        <div>
          <h2>Get AI Suggested Skillset Through Your Job Description</h2>
          <textarea
            className={styles["custom-text-area"]}
            placeholder="Enter your text here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
          <div className={styles["skill-img"]}>
            <img src="/newimg/skill.png" alt="" />
          </div>
          <div className={styles["skill-btn-div"]}>
            <div className={styles["skill-btn"]} onClick={handleGenerateTemplate}>
              {loading ? "Generating..." : "Get Skill"}
            </div>
          </div>
        </div>
        <div className={styles["skill-div-2"]}>
          <h4>Skillset Matching Your Profile</h4>
          {skills ? (
            <div className={styles["skills-set-card"]}>
              {["Required Skillsets", "Desired Skillsets", "Additional Skillsets"].map(
                (category, index) => (
                  <div className={styles.card1} key={index}>
                    <div className={styles["skill-icon"]}>
                      <img src="/images/icon-bg.png" alt="image" style={{ width: "5rem" }} />
                      <img
                        src="/image 21.png"
                        alt="image"
                        className={styles.match}
                      />
                    </div>

                    <div className={styles.card1_box}>
                      <h6>{category}</h6>
                      {skills[category].map((skill, idx) => (
                        <div
                          className={styles["skill-set"]}
                          style={{  }}
                          key={idx}
                        >
                          <div style={{ color: "#fff" }}>{skill}</div>
                        </div>
                      ))}
                    </div>
                  
                  </div>
                )
              )}
            </div>
          ) : (
            <p style={{textAlign:"center", marginBottom:"3rem"}}>No skillsets generated yet. Please enter a job description and click "Get Skill".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillMatching;
