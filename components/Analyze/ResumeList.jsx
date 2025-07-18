"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ensure you have your Firestore configuration
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firestore
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { setResumeId } from "../../store";
import { useRouter } from "next/router";
import { RingLoader } from 'react-spinners'

const ResumeList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch
  const category = useSelector((state) => state.category);
  const router = useRouter();

  const handleClick = (id) => {
    dispatch(setResumeId(id));
    router.push("/editor");
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDocRef = doc(db, 'userAdmin', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          console.log(userDocSnap.data(), "user with resume data");
        } else {
          console.error('No such document!');
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formattedDate = userData?.createdAt instanceof Timestamp
    ? new Date(userData.createdAt.toDate()).toLocaleDateString()
    : 'Invalid date';

  return (
    <div className="resume-container">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RingLoader color="#36d7b7" loading={loading} size={150} />
        </div>
      ) : isLoggedIn ? (
        <div className="custom-resume-list">
          <h2 style={{ paddingLeft: '20px' }}>Recent Resumes</h2>
          <ul>
            {userData?.resumes?.slice(0,4).map((resume, index) => (
              <li key={index}>
                <span>{index + 1}.</span>
                <span>{userData.username}</span> {/* Display the username */}
                <span>{formattedDate}</span> {/* Display the formatted creation date from userData */}
                <img src="/pdf.png" alt="PDF Icon" />
                <div className="custom-actions">
                  {/* Use onClick to dispatch action and navigate */}
                  <Link href="/editor" onClick={() => handleClick(resume.resumeId)}>Edit</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }} >
          <img src="/anal.png" alt="Not logged in" className='hide'/>
        </div>
      )}
    </div>
  );
};

export default ResumeList;
