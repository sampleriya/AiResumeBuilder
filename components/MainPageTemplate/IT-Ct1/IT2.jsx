import styles from "./IT-CT2.module.css";
import { useSelector } from "react-redux";


const Resume = () => {
  const color = useSelector((state) => state.color);
  const resumeData = useSelector((state) => state.resumeData);

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

  const [firstName, lastName] = name.split(" ");
  const { phone, email, address } = contactInfo;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.fullName}>
          <span className={styles.firstName} style={{ color: color }}>
            {firstName}
          </span>
          <span className={styles.lastName}>{lastName}</span>
        </div>
        <div className={styles.contactInfo}>
          <span className={styles.email}>Email: </span>
          <span className={styles.emailVal}>{email}</span>
          <span className={styles.separator}></span>
          <span className={styles.phone}>Phone: </span>
          <span className={styles.phoneVal}>{phone}</span>
        </div>
        <div className={styles.address}>
          <span className={styles.addressVal}>{address}</span>
        </div>
        <div className={styles.linkedin}>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.section}>
          <div className={styles.sectionTitle} style={{ color: color }}>
            Experience
          </div>
          <div className={styles.sectionList}>
            {workExperience.map((exp, index) => (
              <div className={styles.sectionListItem} key={index}>
                <div className={styles.left}>
                  <div className={styles.name}>{exp.title}</div>
                  <div className={styles.addr}>{exp.company}</div>
                  <div className={styles.duration}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.desc}>
                    {exp.details.map((detail, idx) => (
                      <div key={idx}>{detail}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} style={{ color: color }}>
            Education
          </div>
          <div className={styles.sectionList}>
            {education.map((edu, index) => (
              <div className={styles.sectionListItem} key={index}>
                <div className={styles.left}>
                  <div className={styles.name}>{edu.degree}</div>
                  <div className={styles.addr}>{edu.institution}</div>
                  <div className={styles.duration}>
                    {edu.startYear} - {edu.endYear}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} style={{ color: color }}>
            Certification
          </div>
          <div className={styles.sectionList}>
            {certification.map((cert, index) => (
              <div className={styles.sectionListItem} key={index}>
                <div className={styles.name}>{cert.title}</div>
                <div className={styles.text}>
                  {cert.year} - {cert.authority}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} style={{ color: color }}>
            Awards
          </div>
          <div className={styles.sectionList}>
            {awards.map((award, index) => (
              <div className={styles.sectionListItem} key={index}>
                <div className={styles.name}>{award.title}</div>
                <div className={styles.text}>
                  {award.year} - {award.awarder}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} style={{ color: color }}>
            Skills
          </div>
          <div className={styles.skills}>
            {skills.map((skill, index) => (
              <div className={styles.skillsItem} key={index}>
                <div className={styles.name}>{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
