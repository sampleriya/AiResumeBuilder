import styles from './F1.module.css';

const Resume = ({
  name,
  contactInfo,
  linkedinUrl,
  workExperience,
  skills,
  education,
  certification,
  awards,
}) => {
  return (
    <section className={styles.mainSection}>
      <div className={styles.leftPart}>
        <div className={styles.photoContainer}>
          <img src="/profile.jpg" alt="Profile" />
        </div>
        <div className={styles.contactContainer}>
          <h2 className={styles.title}>Contact Me</h2>
          <div className={styles.contactList}>
            <i className="bi bi-geo-alt-fill"></i>
            <p>{contactInfo.address}</p>
          </div>
          <div className={styles.contactList}>
            <i className="bi bi-envelope-fill"></i>
            <p>{contactInfo.email}</p>
          </div>
          <div className={styles.contactList}>
            <i className="bi bi-laptop"></i>
            <p>{linkedinUrl}</p>
          </div>
        </div>

        <div className={styles.educationContainer}>
          <h2 className={styles.title}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className={styles.course}>
              <h2 className={styles.educationTitle}>{edu.degree}</h2>
              <h5 className={styles.collegeName}>{edu.institution}</h5>
              <p className={styles.educationDate}>
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.skillsContainer}>
          <h2 className={styles.title}>Skills</h2>
          {skills.map((skill, index) => (
            <div key={index} className={styles.skill}>
              <p>{skill}</p>
              <div className={styles.outerLayer}>
                <div className={styles.innerLayer}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightPart}>
        <div className={styles.banner}>
          <h1 className={styles.firstname}>{name.split(' ')[0]}</h1>
          <h1 className={styles.lastname}>{name.split(' ').slice(1).join(' ')}</h1>
          <p className={styles.position}>Marketing Manager</p>
        </div>

        <div className={styles.workContainer}>
          <h2 className={`${styles.title} ${styles.textLeft}`}>Work Experience</h2>
          {workExperience.map((work, index) => (
            <div key={index} className={styles.work}>
              <div className={styles.jobDate}>
                <p className={styles.job}>{work.title}</p>
                <p className={styles.date}>
                  {work.startDate} - {work.endDate}
                </p>
              </div>
              <h2 className={styles.companyName}>{work.company}</h2>
              {work.details.map((detail, detailIndex) => (
                <p key={detailIndex} className={styles.workText}>
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.referencesContainer}>
          <h2 className={`${styles.title} ${styles.textLeft}`}>References</h2>
          {/* Conditionally render references if provided */}
        </div>
      </div>
    </section>
  );
};

export default Resume;
