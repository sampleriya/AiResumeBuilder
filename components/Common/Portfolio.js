import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const Portfolio = ({ bgColor, contentColor, shape }) => {
  return (
    <>
      <div className={`portfolio-area ${bgColor}`}>
        <div className="container">
          <div className={`single-portfolio-item ${contentColor}`}>
            <div className="row align-items-center m-0">
              <div className="col-xl-5 col-lg-6 col-md-12 p-0">
                <Swiper
                  slidesPerView={1} 
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay, Pagination]}
                  className="content-slides"
                >
                  <SwiperSlide>
                    <div className="content">
                      <h3>Manage Your Portfolio</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <h3>Poerfull API</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <h3>Vault Protection</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco.
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="col-xl-7 col-lg-6 col-md-12 p-0">
                <div className="image text-center">
                  <img src="/images/portfolio/portfolio-img1.png" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {shape && (
          <div className="shape11">
            <img src="/images/shape/shape11.png" alt="image" />
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
