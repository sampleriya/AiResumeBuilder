"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styles from "./AllBlogs.module.css";
import PaginatedList from "./Paginated/PaginatedList";
import { app, db } from "../../firebaseConfig";
import { ClipLoader } from "react-spinners"; // Spinner for loading state

const AllBlogs = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        console.log(categoriesData);
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
        setBlogs(blogsData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="spinnerContainer">
        <ClipLoader color="#36d7b7" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Render only if both categories and blogs are present */}
      {categories.length > 0 && blogs.length > 0 ? (
        <>
          <div className={styles.div1}>
            <div className="">
              <img src="/newimg/bg-blg.png" alt="" className="hide" />
            </div>
            <div className="child_div_right">
              <div className="child-right-top">
                <h6>Categories</h6>
                {categories.slice(0, 7).map((item) => (
                  <div className="flex-container" key={item.name}>
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="child-right-bottom">
                <h6>Top Blogs</h6>
                {blogs.slice(0, 6).map((item, i) => (
                  <div className="flex-container2" key={item.title}>
                    <div>{i + 1}.</div>
                    <div className={styles.title}>{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.div2}>
            <PaginatedList items={blogs} itemsPerPage={6} />
          </div>
        </>
      ) : (
        <div>No blogs or categories available at the moment.</div> // Fallback when data is not present
      )}
    </div>
  );
};

export default AllBlogs;
