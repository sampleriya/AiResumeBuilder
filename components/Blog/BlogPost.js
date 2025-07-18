import React from "react";
import Link from "next/link";

const BlogPost = () => {
  return (
    <>
      <div className="blog-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog1.jpg" alt="image" />
                  </Link>
                  <div className="tag-list"> 
                    <Link href="#">Filecoin</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      How Filecoin is Up 50% in a Week & Could Take More Profits
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user1.jpg" alt="image" />
                    <Link href="#">Steven Smith</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog2.jpg" alt="image" />
                  </Link>
                  <div className="tag-list">
                    <Link href="#">Education</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      Coinbase Releases Investor Education Resources in 2021
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user2.jpg" alt="image" />
                    <Link href="#">Sarah Taylor</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog3.jpg" alt="image" />
                  </Link>
                  <div className="tag-list">
                    <Link href="#">Bitcoin</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      World’s Largest Bitcoin Conference Coming To Miami in June
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user3.jpg" alt="image" />
                    <Link href="#">David Warner</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog4.jpg" alt="image" />
                  </Link>
                  <div className="tag-list">
                    <Link href="#">Bitcoin</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      Who Is Buying Bitcoin And Pushing Its Price Higher In
                      2021?
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user4.jpg" alt="image" />
                    <Link href="#">James Andy</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog5.jpg" alt="image" />
                  </Link>
                  <div className="tag-list">
                    <Link href="#">Crypto</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      Robinhood Or Coinbase? Which is Better For Crypto?
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user5.jpg" alt="image" />
                    <Link href="#">David Wisey</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href="/blog-details" className="d-block">
                    <img src="/images/blog/blog6.jpg" alt="image" />
                  </Link>
                  <div className="tag-list">
                    <Link href="#">Gamble</Link>
                  </div>
                </div>
                <div className="post-content">
                  <h3>
                    <Link href="/blog-details">
                      Can You Use Cryptocurrency to Gamble Online in 2021?
                    </Link>
                  </h3>
                  <p>
                    Borem ipsum dolor sit amet, adhuc iriure dissentias est in,
                    est ne diam graece tincidunt.
                  </p>
                  <div className="author d-flex align-items-center">
                    <img src="/images/user/user6.jpg" alt="image" />
                    <Link href="#">Lucy Donar</Link>
                  </div>
                  <Link href="/blog-details" className="link-btn">
                    <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="pagination-area">
                <div className="nav-links">
                  <span className="page-numbers current">1</span>
                  <a className="page-numbers">2</a>
                  <a className="page-numbers">3</a>
                  <a className="next page-numbers" title="Next Page">
                    <i className="bx bx-chevrons-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
