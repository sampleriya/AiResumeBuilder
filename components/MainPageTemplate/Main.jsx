"use client";
import React, { useState } from "react";
import styles from "./Main.module.css";
import IT1 from "./IT-Ct1/IT1";
import IT2 from "./IT-Ct1/IT2";
import IT3 from "./IT-Ct1/IT3";
import IT4 from "./IT-Ct1/IT-CT4";
import IT5 from "./IT-Ct1/IT5";
import RadioButton from "./RadioButton/RadioButton";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import GridComponent from "./GridComponent/GridComponent";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  setColor,
  resetColor,
  setSelectedResume,
  setResumeId,
} from "../../store";
import { ChromePicker } from "react-color";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState("withPhoto");
  const [showColorPicker, setShowColorPicker] = useState(false); // State to manage color picker visibility
  const [currentColor, setCurrentColor] = useState("#fff"); // State to manage current color
  const category = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(setResumeId(id));
    router.push("/editor");
  };

  const handleResumeClick = (resumeData) => {
    dispatch(setSelectedResume(resumeData));
    router.push("/editor");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const changeColor = (color) => {
    dispatch(setColor(color));
    setCurrentColor(color); // Update the current color state
  };

  const changeOriginal = () => {
    dispatch(resetColor());
    setCurrentColor("#fff"); // Reset color state
  };

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

  const resumeDataIT3 = {
    name: "JIMOTHY BAGATSING, CPA",
    contactInfo: {
      phone: "0123 456 7890",
      email: "hello@reallygreatsite.com",
      address: "123 Diwa St., Kalayaan City 1234",
    },
    linkedinUrl: "https://linkedin.com/in/name",
    workExperience: [
      {
        title: "TAX MANAGER",
        company: "Washimi Laundry",
        startDate: "June 2020",
        endDate: "Present",
        details: [
          "Assisted in the preparation of annual budgets and financial forecasts",
          "Conducted regular audits of financial records and processes to ensure compliance with accounting standards and regulations",
        ],
      },
      {
        title: "STAFF ACCOUNTANT",
        company: "Bangon Savings Bank",
        startDate: "January 2018",
        endDate: "May 2020",
        details: [
          "Collaborated with other departments to resolve accounting-related issues and provide financial guidance",
          "Maintained accurate and up-to-date records of financial transactions and documentation",
          "Utilized accounting software and tools to streamline processes and improve efficiency.",
        ],
      },
    ],
    skills: [
      "Accounting principles",
      "Tax laws",
      "Financial data analytics",
      "Expert in accounting software and tools",
      "Communication of financial information to stakeholders",
    ],
    education: [
      {
        degree: "BACHELOR IN ACCOUNTING",
        institution: "Las Felipinas University",
        startYear: "2014",
        endYear: "2018",
      },
      {
        degree: "MASTER IN BUSINESS ADMINISTRATION",
        institution: "Kalayaan Business School",
        startYear: "2021",
        endYear: "2023",
      },
    ],
    certification: [
      {
        title: "CERTIFIED PUBLIC ACCOUNTANT (CPA)",
        year: "2021",
        authority: "Professional Regulations Commission",
      },
      {
        title: "CERTIFIED FINANCIAL ANALYST (CFA)",
        year: "2022",
        authority: "CFA Institute",
      },
    ],
    awards: [
      {
        title: "Outstanding Accountant of the Year",
        year: "2022",
        awarder: "Accounting Association of the Philippines",
      },
      {
        title: "Best in Taxation",
        year: "2021",
        awarder: "Philippine Institute of Certified Public Accountants",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.img}>
          <img src="/newimg/bg-1.png" alt="Background" />
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
                  style={{ width: "2rem" }}
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

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div>
          <CategoryMenu />
        </div>
        <div style={{ paddingLeft: "2rem" }}>
          <h6>{category}</h6>
        </div>
        {category === "Finance" && (
          <GridComponent>
            <div
              className="preview"
              onClick={() => handleClick(1)}
              style={{ cursor: "pointer" }}
            >
              
              <IT1 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(3)}
              style={{ cursor: "pointer" }}
            >
              <IT3 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(4)}
              style={{ cursor: "pointer" }}
            >
              <IT4 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(5)}
              style={{ cursor: "pointer" }}
            >
              <IT5 />
            </div>
          </GridComponent>
        )}
        {category === "IT" && (
          <GridComponent>
            <div
              className="preview"
              onClick={() => handleClick(4)}
              style={{ cursor: "pointer" }}
            >
              <IT4 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(5)}
              style={{ cursor: "pointer" }}
            >
              <IT5 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(3)}
              style={{ cursor: "pointer" }}
            >
              <IT3 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(1)}
              style={{ cursor: "pointer" }}
            >
              <IT1 />
            </div>
          </GridComponent>
        )}
        {category === "Healthcare" && (
          <GridComponent>
            <div
              className="preview"
              onClick={() => handleClick(3)}
              style={{ cursor: "pointer" }}
            >
              <IT3 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(4)}
              style={{ cursor: "pointer" }}
            >
              <IT4 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(1)}
              style={{ cursor: "pointer" }}
            >
              <IT1 />
            </div>
            <div
              className="preview"
              onClick={() => handleClick(5)}
              style={{ cursor: "pointer" }}
            >
              <IT5 />
            </div>
          </GridComponent>
        )}
      </div>
    </div>
  );
};

export default Main;
