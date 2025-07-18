import Image from "next/image";
import styles from "./ResumeSection.module.css"; // Importing the CSS module

const ResumeSection = () => {
  return (
    <section className={styles.container}>
      {/* Image from your localhost (background is set in CSS) */}
      <img src="/pre-1.png" alt="Background Image 1" className={styles.backgroundImage1} />
      <img src="/pre-2.png" alt="Background Image 2" className={styles.backgroundImage2} />

      <div className={styles.img}>
        <img src="/resume 1.png" alt="" />
      </div>
      <div>
        <h4>Resume Made Easy With Coorporate Gate</h4>
      </div>
      <div>
        {/* ats friendly div 1  */}
        {[
          "Pick A ATS-friendly resume templates",
          "Customize your Resume by Adding your personal information, work experience, and skills",
          "Review your polished resume, then download it instantly to start applying for jobs with confidence.",
        ].map((item, i) => {
          return (
            <div className={styles.li} key={i}>
              <img src="/tick.png" alt="" srcset="" />
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResumeSection;
