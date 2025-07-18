import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch from react-redux
import { setCategory } from '../../../store'; // Import the setCategory action
import styles from './CategoryMenu.module.css';

const CategoryMenu = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const currentCategory = useSelector((state) => state.category); // Read the current category from the store

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    dispatch(setCategory(tabName)); // Dispatch the setCategory action
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.tabs}>
        {['All', 'Professional', 'Creative', 'Minimal'].map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div> */}
      <div className={styles.dropdown}>
        <div className={styles.dropdownToggle} onClick={toggleDropdown}>
          Categories <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={() => handleTabClick('Finance')}>Finance</div>
            <div className={styles.dropdownItem} onClick={() => handleTabClick('IT')}>IT</div>
            <div className={styles.dropdownItem} onClick={() => handleTabClick('Healthcare')}>Healthcare </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
