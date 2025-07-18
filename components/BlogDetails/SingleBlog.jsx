"use client"
import React, { useState, useEffect } from "react";
import { app, db } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const SingleBlog = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlog, setFilteredBlog] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        console.log(categoriesData, "category is here ");
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => doc.data());
        console.log(blogsData, "blogs data is here");
        // setCategories(categoriesData);
        setBlogs(blogsData);
        if (query.slug) {
          const blog = blogsData.find((blog) => blog.slug === query.slug);
          console.log(blog, "finding the blog");
          setFilteredBlog(blog);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlogs();
  }, []);
  console.log(query.slug);

  const StyledDiv = styled.div`
  p {
    font-size: 16px;
  }
  
  h3 {
    font-size: 24px;
  }
  
  /* Add more tag-specific styles here */
`;

  return (
    <div className="singleBlog_container">
      <div className="img_div">
        <img src={filteredBlog?.image} alt="" />
      </div>
      <div className="container_div">
        <div className="child_div">
          <div className="child_div_left">
            <div>
              <h3>{filteredBlog?.title}</h3>
              <p>
                {filteredBlog?.category} ,{" "}
                {filteredBlog?.createdAt &&
                  new Date(
                    filteredBlog.createdAt.seconds * 1000
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </p>
              <StyledDiv 
                dangerouslySetInnerHTML={{
                  __html: filteredBlog?.editorDescription,
                }}
              ></StyledDiv >

              <div className="tags">
                {filteredBlog?.tags.map((item) => {
                  return (
                    <div
                      key={item}
                      style={{
                        color: "white",
                        background: "#92E5E0",
                        padding: "0.5rem 1rem",
                        borderRadius: "10px",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="child_div_right">
            <div className="child-right-top">
              <h6>Categories</h6>
              {categories.slice(0, 6).map((items) => {
                return <div className="flex-container">{items.name}</div>;
              })}
            </div>
            <div className="child-right-bottom">
              <h6>Top Blogs</h6>
              {blogs.slice(0, 6).map((items, i) => {
                return (
                  <div className="flex-container2">
                    <div>{i + 1}</div>
                    <div>{items.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
