"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Platform = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
        console.log(blogsData);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="cryptocurrency-platform-area">
        <div className="container-fluid">
          <div className="section-title">
            <h2>Our Recently Top Blog</h2>
            <p>
              our top blog will help you in your resume, finance, and to help
              you to get your dream job
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              922: {
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="cryptocurrency-platform-slides"
          >
            {/* Blog 0 */}
            <SwiperSlide>
              <div className="single-cryptocurrency-platform-box">
                <img
                  // src="/images/cryptocurrency-platform/cryptocurrency-platform-1.jpg"
                  src={blogs[0]?.image}
                  alt="image"
                  className="w-100"
                />
                <div className="content">
                  <div className="icon">
                    <img
                      src="/Ellipse 66.png"
                      alt="image"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <h3>
                    {blogs[0] ? (
                      <Link href={`/blog/${blogs[0].slug}`}>
                        {blogs[0].category}
                      </Link>
                    ) : (
                      "Loading..."
                    )}
                  </h3>
                  <p>{blogs[0] && blogs[0].title}</p>
                  <Link href={blogs[0] ? `/blog/${blogs[0].slug}` : "#"} className="link-btn">
                    View More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Blog 1 */}
            <SwiperSlide>
              <div className="single-cryptocurrency-platform-box">
                <img
                  // src="/featRect.png"
                  src={blogs[0]?.image}
                  alt="image"
                  className="w-100"
                />
                <div className="content">
                  <div className="icon">
                    <img
                      src="/Ellipse 66.png"
                      alt="image"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <h3>
                    {blogs[1] ? (
                      <Link href={`/blog/${blogs[1].slug}`}>
                        {blogs[1].category}
                      </Link>
                    ) : (
                      "Loading..."
                    )}
                  </h3>
                  <p>{blogs[1] && blogs[1].title}</p>
                  <Link href={blogs[1] ? `/blog/${blogs[1].slug}` : "#"} className="link-btn">
                    View More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Blog 2 */}
            {/* <SwiperSlide>
              <div className="single-cryptocurrency-platform-box">
                <img
                  src="/images/cryptocurrency-platform/cryptocurrency-platform-4.jpg"
                  alt="image"
                  className="w-100"
                />
                <div className="content">
                  <div className="icon">
                    <img
                      src="/Ellipse 66.png"
                      alt="image"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <h3>
                    {blogs[2] ? (
                      <Link href={`/blog/${blogs[2].slug}`}>
                        {blogs[2].category}
                      </Link>
                    ) : (
                      "Loading..."
                    )}
                  </h3>
                  <p>{blogs[2] && blogs[2].title}</p>
                  <Link href={blogs[2] ? `/blog/${blogs[2].slug}` : "#"} className="link-btn">
                    View More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide> */}

            {/* Default Blog */}
            {/* <SwiperSlide>
              <div className="single-cryptocurrency-platform-box">
                <img
                  src="/images/cryptocurrency-platform/cryptocurrency-platform-2.jpg"
                  alt="image"
                  className="w-100"
                />
                <div className="content">
                  <div className="icon">
                    <img
                      src="/Ellipse 66.png"
                      alt="image"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <h3>
                    <Link href="/cryptocurrency-details">Finance</Link>
                  </h3>
                  <p>
                    go to homepage and login through your gmail and create an
                    account and get connected
                  </p>
                  <Link href="/cryptocurrency-details" className="link-btn">
                    View More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Platform;
