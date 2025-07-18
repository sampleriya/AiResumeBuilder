"use client"
import React, { useState, useEffect } from 'react';
import styles from "./CustomSlider.module.css";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from "../../firebaseConfig"; 
import { ClipLoader } from 'react-spinners'; // Import the spinner

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogsData = querySnapshot.docs.map(doc => doc.data());
        console.log(blogsData);
        setSlider(blogsData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchBlogs();
  }, []);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slider.length);
  };

  if (loading) {
    return (
      <div className="spinnerContainer">
        <ClipLoader color="#36d7b7" loading={loading} size={50} /> {/* Customize spinner color and size */}
      </div>
    );
  }

  return (
    <div className={styles.slider}>
      <div 
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slider.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
          >
            <img src={slide.image} alt="Slide Image" className={styles.image} />
            <div className={styles.textOverlay}>
              <h2>{slide.title}</h2>
              {/* <h3>{slide.subtitle}</h3> */}
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {slider.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
      <div className={styles.next} onClick={nextSlide}>
        <img src="/blog-arrow.png" alt="Next Slide" />
      </div>
    </div>
  );
};

export default Slider;
