import React from "react";

const Funfact = ({ pt100 }) => {
  return (
    <>
      <div className={`funfacts-area ${pt100}`} style={{fontFamily:"var(--fontFamily3)"}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="single-funfacts-box">
                <div className="icon">
                  <img src="/images/icon-bg.png" alt="image" />
                  <img
                    src="/newimg/ft-1.png"
                    className="main-icon"
                    alt="image"
                  />
                </div>
                <h3>AI Powered</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="single-funfacts-box">
                <div className="icon">
                  <img src="/images/icon-bg.png" alt="image" />
                  <img
                    src="/newimg/ft-2.png"
                    className="main-icon"
                    alt="image"
                  />
                </div>
                <h3>Automatic Cover Letter</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="single-funfacts-box">
                <div className="icon">
                  <img src="/images/icon-bg.png" alt="image" />
                  <img
                    src="/newimg/ft-3.png"
                    className="main-icon"
                    alt="image"
                  />
                </div>
                <h3>professional Templates</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="single-funfacts-box">
                <div className="icon">
                  <img src="/images/icon-bg.png" alt="image" />
                  <img
                    src="/newimg/ft-4.png"
                    className="main-icon"
                    alt="image"
                  />
                </div>
                <h3>Easy to Use</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funfact;
