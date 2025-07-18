import React from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const WalletAreaTabs = () => {
  return (
    <>
      <div className="wallet-area ptb-100">
        <div className="container">
          <Tabs className="wallet-tabs">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12">
                <TabPanel>
                  <div className="box">
                    <h3>World Class Security</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bx bx-check"></i> You’re the custodian,
                        you have control
                      </li>
                    </ul>
                    <Link href="/authentication" className="default-btn">
                      <i className="bx bxs-user"></i> Learn More
                    </Link>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="box">
                    <h3>Send & Receive Instantly</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bx bx-check"></i> We support bitcoin
                        (BTC), ether (ETH), bitcoin cash (BCH), stellar (XLM),
                        algorand (ALGO), tether (USDT) and USD Digital (USD-D)
                      </li>
                      <li>
                        <i className="bx bx-check"></i> Lowest fees
                      </li>
                    </ul>
                    <Link href="/authentication" className="default-btn">
                      <i className="bx bxs-user"></i> Get Started
                    </Link>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="box">
                    <h3>Exchange Crypto to Crypto</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bx bx-check"></i> Exchange
                        crypto-to-crypto instantly
                      </li>
                      <li>
                        <i className="bx bx-check"></i> Buy and sell supported
                        in 100 countriesy
                      </li>
                    </ul>
                    <Link href="/authentication" className="default-btn">
                      <i className="bx bxs-user"></i> Login Now
                    </Link>
                  </div>
                </TabPanel>
                
                <TabPanel>
                  <div className="box">
                    <h3>Access Your Wallet Anywhere</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bx bx-check"></i> iOS, Android, Web
                      </li>
                      <li>
                        <i className="bx bx-check"></i> Available in 25
                        languages
                      </li>
                      <li>
                        <i className="bx bx-check"></i> Supports 22 currencies
                      </li>
                    </ul>
                    <Link href="/authentication" className="default-btn">
                      <i className="bx bxs-user"></i> Register Now
                    </Link>
                  </div>
                </TabPanel>
              </div>

              <div className="col-lg-4 col-md-12">
                <TabList>
                  <Tab>
                    <i className="bx bx-shield-quarter"></i>
                    Security
                  </Tab>
                  <Tab>
                    <i className="bx bx-transfer"></i>
                    Send & Receive
                  </Tab>
                  <Tab>
                    <i className="bx bx-dollar"></i>
                    Buy, Sell, & Exchange
                  </Tab>
                  <Tab>
                    <i className="bx bx-globe"></i>
                    Access Anywhere
                  </Tab>
                </TabList>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default WalletAreaTabs;
