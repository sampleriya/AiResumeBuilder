const AccountCreate = ({ title }) => {
  return (
    <>
      <div
        className="account-create-process-area ptb-100"
        style={{ fontFamily: "var(--fontFamily3)" }}
      >
        <div className="" style={{maxWidth:"100%" , padding: "0 7rem"}}>
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-9 col-md-12">
              <div className="account-create-process-content">
                <div className="section-title">
                  <h2>{title}</h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-lg-4 col-sm-6 col-md-6">
                    <div className="single-process-box">
                      <div className="icon">
                        <img src="/g-1.png"  alt="image" className="create_img"/>
                      </div>
                      <h3>Login</h3>
                      <p>
                        go to homepage and login through your gmail and create
                        an account and get connected
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-md-6">
                    <div className="single-process-box">
                      <div className="icon">
                        <img src="/g-2.png"   alt="image" className="create_img"/>
                      </div>
                      <h3>Choose Template</h3>
                      <p>
                      go to homepage and login through your gmail and create
                      an account and get connected
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-md-6">
                    <div className="single-process-box">
                      <div className="icon">
                        <img src="/g-3.png" alt="image" className="create_img"/>
                      </div>
                      <h3>Customize</h3>
                      <p>
                      go to homepage and login through your gmail and create
                      an account and get connected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-3 col-md-12">
              <div className="account-create-process-image text-center">
                <img src="/get.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCreate;
