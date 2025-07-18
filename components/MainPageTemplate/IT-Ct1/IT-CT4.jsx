"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "./IT-CT4.module.css";
import WorkExperienceModal from "../../Modals/ExperienceModal";
import EducationModal from "../../Modals/EducationModal";
import SkillsModal from "../../Modals/SkillsModal";
import CertificationModal from "../../Modals/CertificateModal";
import AwardsModal from "../../Modals/AwardsModal";
import ContactModal from "../../Modals/ContactModal";

const ResumeTemplateThree = () => {
  const router = useRouter();
  const { pathname } = router;
  const resumeData = useSelector((state) => state.resumeDataIT3);
  const color = useSelector((state) => state.color);

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
    contact:false,
    workExperience: false,
    education: false,
    skills: false,
    certification: false,
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
    backgroundColor: hoveredSection === sectionType ? "#f5f5f5" : "",
    cursor: hoveredSection === sectionType ? "pointer" : "default",
   
  });

  // Check if the current path is `/category-template/` and conditionally render modals
  const shouldShowModals = pathname !== '/category-template/';

  return (
    <div className={styles.resumeContainer}>
      <div className={styles.header}>
        <div
          className={styles.headerText}
          style={{ color: color, borderBottomColor: color }}
          onClick={() => handleOpenModal("contact")}
          onMouseEnter={() => setHoveredSection("contact")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <h1 className={styles.name} style={{ color: color }}>
            {name}
          </h1>
          {contactInfo && (
            <div className={styles.contactInfo}>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
              <p>{contactInfo.address}</p>
              <p>
                <a href={linkedinUrl}>{linkedinUrl}</a>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          {workExperience && workExperience.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={{ color: color, borderBottomColor: color }}
                onClick={() => handleOpenModal("workExperience")}
                // onMouseEnter={() => setHoveredSection("workExperience")}
                // onMouseLeave={() => setHoveredSection(null)}
                // style={getHoverStyle("workExperience")}
              >
                WORK EXPERIENCE
              </h2>
              {workExperience.map((job, index) => (
                <div key={index} className={styles.job}>
                  <h3 className={styles.jobTitle} style={{ color: "black" }}>
                    {job.title}
                  </h3>
                  <p className={styles.company}>{job.company}</p>
                  <p className={styles.jobDate}>{job.date}</p>
                  <ul className={styles.jobDetails}>
                    {job.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {education && education.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={{ color: color, borderBottomColor: color }}
                onClick={() => handleOpenModal("education")}
                onMouseEnter={() => setHoveredSection("education")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                EDUCATION
              </h2>
              {education.map((edu, index) => (
                <p key={index} className={styles.education}>
                  <strong>{edu.degree}</strong>
                  <br />
                  {edu.institution}, {edu.years}
                </p>
              ))}
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={{ color: color, borderBottomColor: color }}
                onClick={() => handleOpenModal("skills")}
                onMouseEnter={() => setHoveredSection("skills")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                RELEVANT SKILLS
              </h2>
              <ul className={styles.skillsList}>
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.rightColumn}>
          {certification && certification.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={{ color: color, borderBottomColor: color }}
                onClick={() => handleOpenModal("certification")}
                onMouseEnter={() => setHoveredSection("certification")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                CERTIFICATIONS
              </h2>
              {certification.map((cert, index) => (
                <p key={index} className={styles.certification}>
                  <strong>{cert.title}</strong>
                  <br />
                  {cert.year} - {cert.authority}
                </p>
              ))}
            </div>
          )}

          {awards && awards.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={{ color: color, borderBottomColor: color }}
                onClick={() => handleOpenModal("awards")}
                onMouseEnter={() => setHoveredSection("awards")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                AWARDS
              </h2>
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
      </div>

      {/* Modals */}
      {shouldShowModals && (
        <>
          <ContactModal
            open={openModal.contact}
            onClose={() => handleCloseModal("contact")}
          />
          {workExperience && workExperience.length > 0 && (
            <WorkExperienceModal
              open={openModal.workExperience}
              onClose={() => handleCloseModal("workExperience")}
            />
          )}
          {education && education.length > 0 && (
            <EducationModal
              open={openModal.education}
              onClose={() => handleCloseModal("education")}
            />
          )}
          {skills && skills.length > 0 && (
            <SkillsModal
              open={openModal.skills}
              onClose={() => handleCloseModal("skills")}
            />
          )}
          {certification && certification.length > 0 && (
            <CertificationModal
              open={openModal.certification}
              onClose={() => handleCloseModal("certification")}
            />
          )}
          {awards && awards.length > 0 && (
            <AwardsModal
              open={openModal.awards}
              onClose={() => handleCloseModal("awards")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ResumeTemplateThree;
