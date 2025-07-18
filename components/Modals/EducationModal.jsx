"use client";
import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

const EducationModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  // Initialize state with empty education data
  const [education, setEducation] = useState([
    { degree: "", institution: "", startYear: "", endYear: "" },
  ]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", startYear: "", endYear: "" },
    ]);
  };

  const handleSubmitEducation = () => {
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        education: education,
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-education"
      aria-describedby="modal-description-education"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', sm: '80%', md: 600 }, 
          maxHeight: "80vh", // Set a maximum height for the modal
          overflowY: "auto", // Enable vertical scrolling
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-education" variant="h6">
          Education
        </Typography>
        {education.map((edu, eduIndex) => (
          <div key={eduIndex}>
            <TextField
              label="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(eduIndex, "degree", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleEducationChange(eduIndex, "institution", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Year"
              value={edu.startYear}
              onChange={(e) =>
                handleEducationChange(eduIndex, "startYear", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="End Year"
              value={edu.endYear}
              onChange={(e) =>
                handleEducationChange(eduIndex, "endYear", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <Button
              variant="outlined"
              onClick={() => handleRemoveEducation(eduIndex)}
            >
              Remove Education
            </Button>
            <hr />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEducation}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--optionalColor)", // Match the border color
            color: "var(--optionalColor)", // Match the text color
            backgroundColor: "#fff", // White background
            borderRadius: "20px", // Rounded border
            padding: "6px 12px", // Adjust padding for better spacing
            textTransform: "none", // Keep the text case as is
            fontSize: "14px", // Set a custom font size
            "&:hover": {
              backgroundColor: "#f0f0f0", // Light gray background on hover
              borderColor: "var(--optionalColor)", // Border color remains the same
            },
          }}
        >
          Add Education
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>+</span>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitEducation}
          sx={{
            backgroundColor: "var(--optionalColor)",
            "&:hover": {
              backgroundColor: "var(--optionalColor)", // Optional: Maintain the same color on hover
            },
            marginLeft: "10px",
            marginTop: "1rem",
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EducationModal;
