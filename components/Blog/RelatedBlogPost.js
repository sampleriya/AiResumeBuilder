import React from "react";
import Link from "next/link";

const RelatedBlogPost = () => {
  return (
    <>
      <div className="blog-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>You May Also Like</h2>
          </div>
          
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
                    <Link href="/blog">Steven Smith</Link>
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
                    <a href="blog-details">
                      Coinbase Releases Investor Education Resources in 2021
                    </a>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedBlogPost;
