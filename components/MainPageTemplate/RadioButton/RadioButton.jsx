import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({ id, name, label, checked, onChange }) => {
  return (
    <div className={styles.radioButtonContainer}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.radioButtonLabel}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
