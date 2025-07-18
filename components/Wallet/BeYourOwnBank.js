import React from "react";
import Link from "next/link";

const BeYourOwnBank = () => {
  return (
    <>
      <div className="wallet-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="wallet-content">
                <h2>Be Your Own Bank</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <Link href="/authentication" className="default-btn">
                  <i className="bx bxs-user"></i> Create Your Wallet
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="wallet-image text-center">
                <img src="/images/wallet.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeYourOwnBank;
