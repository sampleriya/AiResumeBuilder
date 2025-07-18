// components/GridComponent.js
import React from 'react';
import styles from './GridComponent.module.css';

const GridComponent = ({ children }) => {
  return <div className={styles.gridContainer}>{children}</div>;
};

export default GridComponent;
