"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import styles from "./IT-CT5.module.css";
import CertificateModal from "../../Modals/CertificateModal";
import ContactModal from "../../Modals/ContactModal";
import EducationModal from "../../Modals/EducationModal";
import ExperienceModal from "../../Modals/ExperienceModal";
import SkillsModal from "../../Modals/SkillsModal";
import AwardsModal from "../../Modals/AwardsModal";

const ResumeTemplate = () => {
  const router = useRouter();
  const { pathname } = router;
  const {
    name,
    photoUrl,
    contactInfo,
    linkedinUrl,
    summary,
    workExperience,
    skills,
    education,
    certification,
    awards,
    hobbies,
  } = useSelector((state) => state.resumeDataIT3);

  const color = useSelector((state) => state.color);

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
    backgroundColor: hoveredSection === sectionType ? '#f5f5f5' : 'transparent',
    cursor: hoveredSection === sectionType ? 'pointer' : 'default',
    padding: '10px',
    transition: 'background-color 0.3s ease'
  });

  // Check if the current path is `/category-template/` and conditionally render modals
  const shouldShowModals = pathname !== '/category-template';

  return (
    <div className={styles.resumeContainer}>
      <header className={styles.header}>
        {photoUrl && (
          <div className={styles.photoContainer}>
            <img
              src={photoUrl}
              alt={`${name} photo`}
              className={styles.photo}
            />
          </div>
        )}
        <h1 className={styles.name} style={{ color }}>
          {name}
        </h1>
        {contactInfo && (
          <p
            className={styles.contact}
            onClick={() => handleOpenModal("contact")}
            onMouseEnter={() => setHoveredSection("contact")}
            onMouseLeave={() => setHoveredSection(null)}
            style={getHoverStyle("contact")}
          >
            {contactInfo.phone && <span>{contactInfo.phone} • </span>}
            {contactInfo.email && (
              <a href={`mailto:${contactInfo.email}`} className={styles.link}>
                {contactInfo.email}
              </a>
            )}
            {linkedinUrl && (
              <>
                {" • "}
                <a
                  href={linkedinUrl}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </>
            )}
            {contactInfo.address && <span> • {contactInfo.address}</span>}
          </p>
        )}
      </header>

      {summary && (
        <section className={styles.summarySection}>
          <h3 className={styles.sectionTitle} style={{ color }}>
            Summary
          </h3>
          <p>{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section
          className={styles.skillsSection}
          onClick={() => handleOpenModal("skills")}
          onMouseEnter={() => setHoveredSection("skills")}
          onMouseLeave={() => setHoveredSection(null)}
          style={getHoverStyle("skills")}
        >
          <h3 className={styles.sectionTitle} style={{ color }}>
            Skills
          </h3>
          <p className={styles.skills}>{skills.join(" • ")}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section
          className={styles.experienceSection}
          onClick={() => handleOpenModal("experience")}
          onMouseEnter={() => setHoveredSection("experience")}
          onMouseLeave={() => setHoveredSection(null)}
          style={getHoverStyle("experience")}
        >
          <h3 className={styles.sectionTitle} style={{ color, borderBottomColor: color }}>
            Experience
          </h3>
          {workExperience.map((job, index) => (
            <div key={index} className={styles.job}>
              <h4 className={styles.jobTitle}>
                {job.title}{" "}
                <span className={styles.jobCompany}>at {job.company}</span>
              </h4>
              <p className={styles.jobDuration}>
                {job.startDate} - {job.endDate}
              </p>
              <ul className={styles.jobDetails}>
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section
          className={styles.educationSection}
          onClick={() => handleOpenModal("education")}
          onMouseEnter={() => setHoveredSection("education")}
          onMouseLeave={() => setHoveredSection(null)}
          style={getHoverStyle("education")}
        >
          <h3 className={styles.sectionTitle} style={{ color, borderBottomColor: color }}>
            Education
          </h3>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <h4 className={styles.educationTitle}>{edu.degree}</h4>
              <p className={styles.educationInstitution}>
                {edu.institution}{" "}
                <span className={styles.educationDuration}>
                  ({edu.startYear} - {edu.endYear})
                </span>
              </p>
            </div>
          ))}
        </section>
      )}

      {certification && certification.length > 0 && (
        <section
          className={styles.certificationSection}
          onClick={() => handleOpenModal("certificate")}
          onMouseEnter={() => setHoveredSection("certificate")}
          onMouseLeave={() => setHoveredSection(null)}
          style={getHoverStyle("certificate")}
        >
          <h3 className={styles.sectionTitle} style={{ color, borderBottomColor: color }}>
            Courses & Certifications
          </h3>
          {certification.map((cert, index) => (
            <div key={index} className={styles.certificationItem}>
              <h4 className={styles.certificationTitle}>{cert.title}</h4>
              <p className={styles.certificationAuthority}>
                {cert.authority} • {cert.year}
              </p>
            </div>
          ))}
        </section>
      )}

      {awards && awards.length > 0 && (
        <section
          className={styles.awardsSection}
          onClick={() => handleOpenModal("awards")}
          onMouseEnter={() => setHoveredSection("awards")}
          onMouseLeave={() => setHoveredSection(null)}
          style={getHoverStyle("awards")}
        >
          <h3 className={styles.sectionTitle} style={{ color, borderBottomColor: color }}>
            Awards
          </h3>
          {awards.map((award, index) => (
            <div key={index} className={styles.awardItem}>
              <h4 className={styles.awardTitle}>{award.title}</h4>
              <p className={styles.awardDetails}>
                {award.awarder} • {award.year}
              </p>
            </div>
          ))}
        </section>
      )}

      {hobbies && hobbies.length > 0 && (
        <section className={styles.hobbiesSection}>
          <h3 className={styles.sectionTitle} style={{ color }}>
            Interests & Hobbies
          </h3>
          {hobbies.map((hobby, index) => (
            <div key={index} className={styles.hobbyItem}>
              <h4 className={styles.hobbyTitle}>{hobby.title}</h4>
              <p className={styles.hobbyDetails}>{hobby.details}</p>
            </div>
          ))}
        </section>
      )}

      {/* Conditionally Render Modals */}
      {shouldShowModals && (
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

export default ResumeTemplate;
