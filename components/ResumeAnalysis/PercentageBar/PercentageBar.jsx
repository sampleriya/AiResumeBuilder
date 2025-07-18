// components/PercentageBar.js
import styles from "./PercentageBar.module.css";

const PercentageBar = ({ label, percentage, onClick }) => {
  const radius = 40; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.percentageBar} onClick={() => onClick(label)} style={{cursor:"pointer"}}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          <div className={styles.label}>{label}</div>
        </div>
        <svg className={styles.circleSvg}>
          <circle
            className={styles.circleBg}
            cx="50%"
            cy="50%"
            r={`${radius}%`}
          />
          <circle
            className={styles.circleProgress}
            cx="50%"
            cy="50%"
            r={`${radius}%`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
      </div>
      <div className={styles.percentageText}>{percentage}%</div>
    </div>
  );
};

export default PercentageBar;
