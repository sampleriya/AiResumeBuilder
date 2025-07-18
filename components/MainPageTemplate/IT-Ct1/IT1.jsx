"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./IT-Ct1.module.css";
import CertificateModal from "../../Modals/CertificateModal";
import ContactModal from "../../Modals/ContactModal";
import EducationModal from "../../Modals/EducationModal";
import ExperienceModal from "../../Modals/ExperienceModal";
import SkillsModal from "../../Modals/SkillsModal";
import AwardsModal from "../../Modals/AwardsModal";
import { useRouter } from "next/router";

const Resume = () => {
  const router = useRouter();
  const { pathname } = router;
  console.log("Current Pathname:", pathname); // Debugging line

  // Use exact matching if necessary
  const shouldRenderModals = pathname !== "/category-template";

  const color = useSelector((state) => state.color);
  const resumeData = useSelector((state) => state.resumeDataIT3);

  const {
    name,
    contactInfo,
    linkedinUrl,
    workExperience,
    skills,
    education,
    certification,
    awards,
  } = resumeData;

  const [openModal, setOpenModal] = useState({
    certificate: false,
    contact: false,
    education: false,
    experience: false,
    skills: false,
    awards: false,
  });

  const [hoveredSection, setHoveredSection] = useState(null);

  const handleOpenModal = (type) => {
    if (pathname !== '/category-template') {
      setOpenModal((prev) => ({ ...prev, [type]: true }));
    }
  };

  const handleCloseModal = (type) => {
    if (pathname !== '/category-template') {
      setOpenModal((prev) => ({ ...prev, [type]: false }));
    }
  };

  const getHoverStyle = (sectionType) => ({
    backgroundColor: hoveredSection === sectionType ? "#f5f5f5" : "transparent",
    cursor: hoveredSection === sectionType ? "pointer" : "default",
    padding: "10px",
    transition: "background-color 0.3s ease",
  });

  return (
    <div className={styles.resume}>
      <div className={styles.resume_left} style={{ backgroundColor: color }}>
        {/* <div className={styles.resume_profile}>
          <img
            src={resumeData.photoUrl || "https://i.imgur.com/eCijVBe.png"}
            alt="profile_pic"
          />
        </div> */}
        <div className={styles.resume_content}>
          {name && (
            <div className={`${styles.resume_item} ${styles.resume_info}`}>
              <div
                className={styles.title}
                onClick={() => handleOpenModal("contact")}
                onMouseEnter={() => setHoveredSection("contact")}
                onMouseLeave={() => setHoveredSection(null)}
                style={getHoverStyle("contact")}
              >
                <p className={styles.bold}>{name}</p>
                <p className={styles.regular}>{contactInfo.address}</p>
              </div>
              <ul>
                <li>
                  <div className={styles.icon}>
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className={styles.data}>{contactInfo.phone}</div>
                </li>
                <li>
                  <div className={styles.icon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.data}>{contactInfo.email}</div>
                </li>
                <li>
                  <div className={styles.icon}>
                    <i className="fab fa-linkedin"></i>
                  </div>
                  {linkedinUrl && (
                    <div className={styles.data}>
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color:"white"}}
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div
              className={`${styles.resume_item} ${styles.resume_skills}`}
              onClick={() => handleOpenModal("skills")}
              onMouseEnter={() => setHoveredSection("skills")}
              onMouseLeave={() => setHoveredSection(null)}
              style={getHoverStyle("skills")}
            >
              <div className={styles.title}>
                <p className={styles.white}>Skills</p>
              </div>
              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>
                    <div className={styles.skill_name}>{skill}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.resume_right}>
        {workExperience && workExperience.length > 0 && (
          <div
            className={`${styles.resume_item} ${styles.resume_work}`}
            style={{ borderBottomColor: color }}
            onClick={() => handleOpenModal("experience")}
            onMouseEnter={() => setHoveredSection("experience")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("experience")}
          >
            <div className={styles.title}>
              <p className={styles.bold} style={{ color: color }}>
                Work Experience
              </p>
            </div>
            <ul>
              {workExperience.map((work, index) => (
                <li key={index}>
                  <div className={styles.date}>
                    {work.startDate} - {work.endDate}
                  </div>
                  <div className={styles.info}>
                    <p className={styles.semi_bold}>{work.title}</p>
                    <p>{work.company}</p>
                    <ul>
                      {work.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education && education.length > 0 && (
          <div
            className={`${styles.resume_item} ${styles.resume_education}`}
            style={{ borderBottomColor: color }}
            onClick={() => handleOpenModal("education")}
            onMouseEnter={() => setHoveredSection("education")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("education")}
          >
            <div className={styles.title}>
              <p className={styles.bold} style={{ color: color }}>
                Education
              </p>
            </div>
            <ul>
              {education.map((edu, index) => (
                <li key={index}>
                  <div className={styles.date}>
                    {edu.startYear} - {edu.endYear}
                  </div>
                  <div className={styles.info}>
                    <p className={styles.semi_bold}>{edu.degree}</p>
                    <p>{edu.institution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {certification && certification.length > 0 && (
          <div
            className={`${styles.resume_item} ${styles.resume_certification}`}
            style={{ borderBottomColor: color }}
            onClick={() => handleOpenModal("certificate")}
            onMouseEnter={() => setHoveredSection("certificate")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("certificate")}
          >
            <div className={styles.title}>
              <p className={styles.bold} style={{ color: color }}>
                Certifications
              </p>
            </div>
            <ul>
              {certification.map((cert, index) => (
                <li key={index}>
                  <div className={styles.info}>
                    <p className={styles.semi_bold}>{cert.title}</p>
                    <p>
                      {cert.authority}, {cert.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {awards && awards.length > 0 && (
          <div
            className={styles.section}
            onClick={() => handleOpenModal("awards")}
            onMouseEnter={() => setHoveredSection("awards")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("awards")}
          >
            <div className={styles.title}>
              <p className={styles.bold} style={{ color: color }}>
                Awards
              </p>
            </div>

            {awards.map((award, index) => (
              <p key={index} className={styles.awards}>
                <strong>{award.title}</strong>
                <br />
                {award.year} - {award.awarder}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {shouldRenderModals && (
        <>
          <CertificateModal
            open={openModal.certificate}
            onClose={() => handleCloseModal("certificate")}
          />
          <ContactModal
            open={openModal.contact}
            onClose={() => handleCloseModal("contact")}
          />
          <EducationModal
            open={openModal.education}
            onClose={() => handleCloseModal("education")}
          />
          <ExperienceModal
            open={openModal.experience}
            onClose={() => handleCloseModal("experience")}
          />
          <SkillsModal
            open={openModal.skills}
            onClose={() => handleCloseModal("skills")}
          />
          <AwardsModal
            open={openModal.awards}
            onClose={() => handleCloseModal("awards")}
          />
        </>
      )}
    </div>
  );
};

export default Resume;
