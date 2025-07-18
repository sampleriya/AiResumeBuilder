"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./IT-CT3.module.css";
import CertificateModal from "../../Modals/CertificateModal";
import ContactModal from "../../Modals/ContactModal";
import EducationModal from "../../Modals/EducationModal";
import ExperienceModal from "../../Modals/ExperienceModal";
import SkillsModal from "../../Modals/SkillsModal";
import AwardsModal from "../../Modals/AwardsModal";

const Resume = () => {
  const router = useRouter();
  const { pathname } = router;

  // Determine if modals should be rendered based on the current pathname
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
    awards: false
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
    backgroundColor: hoveredSection === sectionType ? '#f5f5f5' : 'transparent',
    cursor: hoveredSection === sectionType ? 'pointer' : 'default',
    padding: '10px',
    
  });

  return (
    <div className={styles.resumeContainer}>
      <div
        className={styles.header}
        onClick={() => handleOpenModal("contact")}
      >
        {contactInfo && (
          <div
            className={styles.headerText}
            onMouseEnter={() => setHoveredSection("contact")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("contact")}
          >
            <h1 className={styles.name} style={{ color: color }}>
              {name}
            </h1>
            <div className={styles.contactInfo}>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
              <p>{contactInfo.address}</p>
              <p>
                <a href={linkedinUrl}>{linkedinUrl}</a>
              </p>
            </div>
          </div>
        )}
      </div>

      {workExperience && workExperience.length > 0 && (
        <div className={styles.section}>
          <h2
            className={styles.sectionTitle}
            style={{ color: color, borderBottomColor: color }}
            onClick={() => handleOpenModal("experience")}
            onMouseEnter={() => setHoveredSection("experience")}
            onMouseLeave={() => setHoveredSection(null)}
            // style={getHoverStyle("experience")}
          >
            WORK EXPERIENCE
          </h2>
          {workExperience.map((job, index) => (
            <div key={index} className={styles.job}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <p className={styles.company}>{job.company}</p>
              <p className={styles.jobDate}>
                {job.startDate} - {job.endDate}
              </p>
              <ul className={styles.jobDetails}>
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
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
            // style={getHoverStyle("skills")}
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

      {education && education.length > 0 && (
        <div className={styles.section}>
          <h2
            className={styles.sectionTitle}
            style={{ color: color, borderBottomColor: color }}
            onClick={() => handleOpenModal("education")}
            onMouseEnter={() => setHoveredSection("education")}
            onMouseLeave={() => setHoveredSection(null)}
            // style={getHoverStyle("education")}
          >
            EDUCATIONAL HISTORY
          </h2>
          {education.map((edu, index) => (
            <p key={index} className={styles.education}>
              <strong>{edu.degree}</strong>
              <br />
              {edu.institution}, {edu.startYear} - {edu.endYear}
            </p>
          ))}
        </div>
      )}

      {certification && certification.length > 0 && (
        <div className={styles.section}>
          <h2
            className={styles.sectionTitle}
            style={{ color: color, borderBottomColor: color }}
            onClick={() => handleOpenModal("certificate")}
            onMouseEnter={() => setHoveredSection("certificate")}
            onMouseLeave={() => setHoveredSection(null)}
            // style={getHoverStyle("certificate")}
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
            // style={getHoverStyle("awards")}
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

      {/* Conditionally Render Modals */}
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
