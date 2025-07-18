import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="cryptocurrency-details-sidebar">
        <div className="buy-cryptocurrency">
          <div className="currency-selection">
            <label>BUY</label>
            <input type="text" value="12.000" />
            <div className="cryptocurrency">
              <img
                src="/images/cryptocurrency/cryptocurrency2.png"
                alt="image"
              />{" "}
              BTC
            </div>
          </div>
          <button type="submit">
            <i className="bx bxs-hand-right"></i> Buy Bitcoin
          </button>
        </div>

        <div className="trending-assets">
          <h3>Trending Cryptocurrency</h3>
          <p>
            Cryptocurrency with the biggest change in unique page views on
            Novis.com over the past 24 hours
          </p>
          
          <ul>
            <li>
              <div className="d-flex align-items-center justify-content-between">
                <div className="title">
                  <img src="/images/cryptocurrency/bitcoin.png" alt="image" />
                  <span className="name">Bitcoin</span>
                  <span className="sub-title">BTC</span>
                </div>
                <div className="price">
                  <span>$56319.3</span>
                  <span className="status up">+3.3%</span>
                </div>
              </div>
              <a href="#" className="link-btn"></a>
            </li>
            <li>
              <div className="d-flex align-items-center justify-content-between">
                <div className="title">
                  <img src="/images/cryptocurrency/ethereum.png" alt="image" />
                  <span className="name">Ethereum</span>
                  <span className="sub-title">ETH</span>
                </div>
                <div className="price">
                  <span>$1713.80</span>
                  <span className="status up">+1.74%</span>
                </div>
              </div>
              <a href="#" className="link-btn"></a>
            </li>
            <li>
              <div className="d-flex align-items-center justify-content-between">
                <div className="title">
                  <img src="/images/cryptocurrency/tether.png" alt="image" />
                  <span className="name">Tether</span>
                  <span className="sub-title">USDT</span>
                </div>
                <div className="price">
                  <span>$0.9997</span>
                  <span className="status up">+0.4%</span>
                </div>
              </div>
              <a href="#" className="link-btn"></a>
            </li>
            <li>
              <div className="d-flex align-items-center justify-content-between">
                <div className="title">
                  <img src="/images/cryptocurrency/cardano.png" alt="image" />
                  <span className="name">Cardano</span>
                  <span className="sub-title">ADA</span>
                </div>
                <div className="price">
                  <span>$1.155000</span>
                  <span className="status up">+1.65%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center justify-content-between">
                <div className="title">
                  <img src="/images/cryptocurrency/polkadot.png" alt="image" />
                  <span className="name">Polkadot</span>
                  <span className="sub-title">DOT</span>
                </div>
                <div className="price">
                  <span>$35.837</span>
                  <span className="status up">+1.63%</span>
                </div>
              </div>
              <a href="#" className="link-btn"></a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
