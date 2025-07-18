import React from "react"; 
import Sidebar from "./Sidebar";
import ChartArea from "./ChartArea";

const PriceDetailsContent = () => {
  return (
    <>
      <div className="cryptocurrency-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="cryptocurrency-details-header">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <div className="cryptocurrency-market">
                    <div className="d-table">
                      <div className="d-table-cell">
                        <ul>
                          <li>
                            <span>Market Cap</span>
                            <h4>$87.5T</h4>
                          </li>
                          <li>
                            <span>Volume (24 hours)</span>
                            <h4>$4.3T</h4>
                          </li>
                          <li>
                            <span>Circulating Supply</span>
                            <h4>18.7M BTC</h4>
                          </li>
                          <li>
                            <span>Visited (24h)</span>
                            <h4>$10.04T</h4>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9 col-md-12">
                  <div className="charts-box">
                    <ChartArea />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="cryptocurrency-details-desc">
                <h3>About Bitcoin</h3>
                <p>
                  The world’s first cryptocurrency, Bitcoin is stored and
                  exchanged securely on the internet through a digital ledger
                  known as a blockchain. Bitcoins are divisible into smaller
                  units known as satoshis — each satoshi is worth{" "}
                  <strong>0.00000001</strong> bitcoin.
                </p>
                
                <div className="resources-list">
                  <span>RESOURCES:</span>
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bx-globe"></i> Official website
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bx-file"></i> Whitepaper
                      </a>
                    </li>
                  </ul>
                </div>

                <h3>What is Bitcoin?</h3>
                <p>
                  Bitcoin is a new kind of money that can be sent from one
                  person to another without the need for a trusted third party
                  such as a bank or other financial institution; it is the first
                  global, decentralized currency.
                </p>
                <h3>What is Bitcoin, the technology?</h3>
                <p>
                  Bitcoin was originally released in 2009 by Satoshi Nakamoto as
                  a piece of software and a paper describing how it works.
                  Because Bitcoin is fundamentally software, anybody can run it
                  on their computer, and therefore participate in a global
                  economy.
                </p>
                <p>
                  One of the most important elements of Bitcoin is the
                  blockchain, whicimport h tracks who
                  owns what, similar to how a bank tracks assets. What sets the
                  Bitcoin blockchain apart from a bank's ledger is that it is
                  distributed, meaning anyone can view it. Since Bitcoin is
                  open, no company, country, or third party is in control of it,
                  and anyone can participate.
                </p>
                <h3>What is bitcoin, the currency?</h3>
                <p>
                  One can use bitcoins to purchase goods on the internet and in
                  stores. The following are some unique properties of Bitcoin:
                </p>

                <ul>
                  <li>
                    <strong>Bitcoin is global:</strong> Bitcoins can be sent to
                    someone across the world as easily as one can pass cash
                    across the counter. Bitcoin isn't closed on weekends and
                    doesn't impose any arbitrary limits.
                  </li>
                  <li>
                    <strong>Bitcoin is irreversible:</strong> Bitcoin is like
                    cash in that transactions cannot be reversed by the sender.
                    In comparison, credit card, popular online payment systems,
                    and banking transactions can be reversed after the payment
                    has been made - sometimes months after the initial
                    transaction.
                  </li>
                  <li>
                    <strong>Bitcoin is private:</strong> When paying with
                    bitcoins, there are no bank statements, and one need not
                    provide unnecessary personal information to the merchant.
                    Bitcoin transactions do not contain any identifying
                    information other than the and amounts involved.
                  </li>
                  <li>
                    <strong>Bitcoin is secure:</strong> Due to the cryptographic
                    nature of the Bitcoin network, Bitcoin payments are
                    fundamentally more secure than standard debit/credit card
                    transactions. When making a Bitcoin payment, no sensitive
                    information is required to be sent over the internet. There
                    is very low risk of your financial information being
                    compromised, or having your identity stolen.
                  </li>
                  <li>
                    <strong>Bitcoin is open:</strong> Every transaction on the
                    Bitcoin network is published publicly, without exception.
                    This means there's no room for manipulation of transactions,
                    changing the money supply, or adjusting the rules mid-game.
                    The software that constitutes the core of Bitcoin is free
                    and open-source so anyone can review the code.
                  </li>
                </ul>
                
                <h3>How can I learn more about Bitcoin? </h3>
                <p>
                  Learn more about Bitcoin the technology and bitcoin the
                  currency by visiting our{" "}
                  <a href="https://bitcoin.org/">https://bitcoin.org/</a>.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetailsContent;
