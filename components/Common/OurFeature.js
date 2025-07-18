const OurFeature = ({ title }) => {
  return (
    <>
      <div
        className="features-area pt-100 pb-70"
        style={{ fontFamily: "var(--fontFamily3)" }}
      >
        <div className="container">
          <div className="section-title">
            <h2>{title}</h2>
            <p>
              Elevate your career with our all-in-one platform that simplifies
              resume creation, offers smart cover letter writing, and provides
              personalized job matching. Easily craft a standout resume, get
              tailored cover letter suggestions, and connect with job
              opportunities that fit your skills and goals—all in one seamless
              experience.
            </p>
          </div>

          <div className="row align-items-center justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-features-box">
                <img src="/feature1.png" alt="image" />
                <h3>Easy Resume Building</h3>
                <p className="feat_para">
                  Creating a professional resume has never been easier. Our
                  user-friendly platform guides you step-by-step through the
                  process, helping you build a resume that stands out and
                  catches the attention of potential employers, all in just a
                  few minutes.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-features-box">
                <img src="/fature2.png" alt="image" />
                <h3>AI Powered Cover Letter</h3>
                <p className="feat_para">
                  Craft a compelling cover letter effortlessly with our
                  AI-powered tool. It analyzes your resume and job descriptions
                  to generate personalized, professional cover letters that
                  enhance your application and improve your chances of landing
                  the job.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-features-box">
                <img src="/feature3.png" alt="image" />
                <h3>Get Matching Job</h3>
                <p className="feat_para">
                  Find the perfect job that matches your skills and experience
                  with our advanced job-matching feature. Our platform uses
                  intelligent algorithms to connect you with opportunities that
                  align with your qualifications, helping you land the right
                  job.
                  {/* faster. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurFeature;
