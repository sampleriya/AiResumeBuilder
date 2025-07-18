import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

const BestSeller = () => {
  return (
    <>
      <div className="best-seller-area pt-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-12 col-md-12">
              <div className="best-seller-image">
                <img src="/images/women.png" alt="image" />
              </div>
            </div>

            <div className="col-xl-8 col-lg-12 col-md-12">
              <div className="best-seller-content">
                <div className="section-title">
                  <h2>Our BestSellers</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.
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
                  className="cryptocurrency-slides"
                >
                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/bitcoin.png" alt="image" />
                        <div className="title">
                          <h3>Bitcoin</h3>
                          <span className="sub-title">
                            BTC - <span>€41,905</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/ethereum.png" alt="image" />
                        <div className="title">
                          <h3>Ethereum</h3>
                          <span className="sub-title">
                            BTC - <span>50,000</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/cardano.png" alt="image" />
                        <div className="title">
                          <h3>Cardano</h3>
                          <span className="sub-title">
                            BTC - <span>38,541</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/peercoin.png" alt="image" />
                        <div className="title">
                          <h3>Peercoin</h3>
                          <span className="sub-title">
                            BTC - <span>€12,000</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/groestlcoin.png" alt="image" />
                        <div className="title">
                          <h3>Groestlcoin</h3>
                          <span className="sub-title">
                            BTC - <span>14,542</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/bitconnect.png" alt="image" />
                        <div className="title">
                          <h3>Bitconnect</h3>
                          <span className="sub-title">
                            BTC - <span>14,514</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="single-cryptocurrency-box">
                      <div className="d-flex align-items-center">
                        <img src="/images/digibyte.png" alt="image" />
                        <div className="title">
                          <h3>Digibyte</h3>
                          <span className="sub-title">
                            BTC - <span>41,514</span>
                          </span>
                        </div>
                      </div>
                      <div className="btn-box">
                        <Link href="/buy" className="link-btn">
                          Buy
                        </Link>
                        <Link href="/sell" className="link-btn">
                          Sell
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="shape14">
          <img src="/images/shape/shape14.png" alt="image" />
        </div>
      </div>
    </>
  );
};

export default BestSeller;
