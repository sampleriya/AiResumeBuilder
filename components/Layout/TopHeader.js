import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { db } from '../../firebaseConfig'; // Adjust path as needed
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const TopHeader = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, 'blogs'); // Get the collection reference
        const blogsSnapshot = await getDocs(blogsCollection); // Get the documents
        const blogsData = blogsSnapshot.docs.map(doc => doc.data()); // Extract data
        console.log(blogsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="swipe-background" style={{ fontFamily: 'var(--fontFamily3)' }}>
        <div className="container">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 3 },
              992: { slidesPerView: 1 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="value-trade-slides"
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <div className="swipe-slide">
                  <ul className="swipe-list">
                    <li>{blog.title || "How to get started"}</li>
                  </ul>
                  <div className="swipe-info">
                    <p className="swipe-category">category: {blog.category || "blog"}</p>
                    <p className="swipe-likes">
                      <img
                        src="/newimg/heart.png"
                        alt="heart"
                        className="swipe-heart"
                      />
                      Likes: {blog.likes || '10k'} {/* Default value or dynamic if available */}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
