import styles from "./Card.module.css";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const Card = ({ image, title, description, timestamp, slug }) => {
  // Convert Firebase Timestamp to JavaScript Date object
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  // Format the date into a relative time string and remove 'about'
  const relativeTime = formatDistanceToNow(date, { addSuffix: true }).replace(/^about\s/, '');

  return (
    <div className={styles.card}>
      <Link href={`/blog/${slug}`}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.content}>
          <p className={styles.timestamp}>{relativeTime}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
