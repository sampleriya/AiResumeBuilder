import React from "react";

const BuySell = ({ pt70 }) => {
  return (
    <>
      <div
        className={`buy-sell-cryptocurrency-area bg-image ${pt70}`}
        style={{ fontFamily: "var(--fontFamily3)", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="section-title">
            <h2>How can WE help YOU</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="buy-sell-cryptocurrency-image hide">
                <img
                  src="/img-ft.png"
                  alt="image"
                  style={{ marginTop: "3rem" }}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="buy-sell-cryptocurrency-content">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img src="/newimg/i-1.png" alt="image" />
                      </div>
                      <h3>Cover Letter</h3>
                      <p>
                        "Generate personalized cover letters effortlessly,
                        tailored to the job you’re applying for, in just a few
                        clicks."
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img src="/i-2.png" alt="image" />
                      </div>
                      <h3>ATS friendly Templates</h3>
                      <p>
                        "Create ATS-friendly templates that enhance your
                        resume’s chances of passing automated screenings."
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img src="/i-3.png" alt="image" />
                      </div>
                      <h3>Blogs</h3>
                      <p>
                        "Discover insights, tips, and advice on career growth,
                        job searching, and professional development."
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img
                          src="/i-4.png"
                          alt="image"
                          style={{ height: "4.6rem" }}
                        />
                      </div>
                      <h3>Know Required Skillset By Job Description</h3>
                      <p>
                        "Analyze job descriptions to identify and match your key
                        skills effortlessly."
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img src="/i-5.png" alt="image" />
                      </div>
                      <h3>Resume Analysis</h3>
                      <p>
                        "Get detailed feedback on your resume to improve and
                        optimize it for job applications."
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="single-buy-sell-box">
                      <div className="icon">
                        <img src="/i-6.png" alt="image" />
                      </div>
                      <h3>Chronological</h3>
                      <p>
                        A traditional format listing your work experience in
                        reverse order, most recent first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
