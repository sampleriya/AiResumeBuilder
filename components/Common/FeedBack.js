import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const FeedBack = () => {
  return (
    <>
      <div className="fedback-area pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <h2>Trusted by Thousands of Users</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <Swiper
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="feedback-slides"
          >
            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user1.jpg" alt="image" />
                    <div className="title">
                      <h3>David Malan</h3>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user2.jpg" alt="image" />
                    <div className="title">
                      <h3>Sarah Taylor</h3>
                      <span>Designer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user3.jpg" alt="image" />
                    <div className="title">
                      <h3>Ben Stokes</h3>
                      <span>Manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user4.jpg" alt="image" />
                    <div className="title">
                      <h3>James Andy</h3>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user5.jpg" alt="image" />
                    <div className="title">
                      <h3>Alina Smith</h3>
                      <span>Designer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user6.jpg" alt="image" />
                    <div className="title">
                      <h3>John Terry</h3>
                      <span>Manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-feedback-item">
                <div className="rating">
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                  <i className="bx bxs-star"></i>
                </div>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled demoralized by the charms of
                  pleasure of the moment, so blinded by desire, that they cannot
                  foresee the pain and trouble that are bound to ensue; and
                  equal blame.
                </p>
                <div className="client-info">
                  <div className="d-flex align-items-center">
                    <img src="/images/user/user4.jpg" alt="image" />
                    <div className="title">
                      <h3>James Andy</h3>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
