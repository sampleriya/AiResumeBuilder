"use client";
import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

const ExperienceModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  // Initialize state with empty work experience
  const [workExperience, setWorkExperience] = useState([
    { title: "", company: "", startDate: "", endDate: "", details: [""] },
  ]);

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  const handleWorkExperienceDetailChange = (expIndex, detailIndex, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[expIndex].details[detailIndex] = value;
    setWorkExperience(updatedExperience);
  };

  const handleAddDetail = (expIndex) => {
    const updatedExperience = [...workExperience];
    updatedExperience[expIndex].details.push("");
    setWorkExperience(updatedExperience);
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedExperience = [...workExperience];
    updatedExperience.splice(index, 1);
    setWorkExperience(updatedExperience);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { title: "", company: "", startDate: "", endDate: "", details: [""] },
    ]);
  };

  const handleSubmitWorkExperience = () => {
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        workExperience: workExperience,
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-work-experience"
      aria-describedby="modal-description-work-experience"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: 600 },
          maxHeight: "80vh", // Set a maximum height
          overflowY: "auto", // Enable vertical scrolling
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-work-experience" variant="h6">
          Work Experience
        </Typography>
        {workExperience.map((exp, expIndex) => (
          <div key={expIndex}>
            <TextField
              label="Title"
              value={exp.title}
              onChange={(e) =>
                handleWorkExperienceChange(expIndex, "title", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company"
              value={exp.company}
              onChange={(e) =>
                handleWorkExperienceChange(expIndex, "company", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Date"
              value={exp.startDate}
              onChange={(e) =>
                handleWorkExperienceChange(
                  expIndex,
                  "startDate",
                  e.target.value
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="End Date"
              value={exp.endDate}
              onChange={(e) =>
                handleWorkExperienceChange(expIndex, "endDate", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            {exp.details.map((detail, detailIndex) => (
              <TextField
                key={detailIndex}
                label={`Detail ${detailIndex + 1}`}
                value={detail}
                onChange={(e) =>
                  handleWorkExperienceDetailChange(
                    expIndex,
                    detailIndex,
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
            ))}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap:"wrap" }}>
              <Button
                variant="outlined"
                onClick={() => handleAddDetail(expIndex)}
                sx={{
                  marginTop: "10px",
                }}
              >
                Add Detail
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleRemoveWorkExperience(expIndex)}
                sx={{
                  marginTop: "10px",
                }}
              >
                Remove Experience
              </Button>
            </div>

            <hr />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddWorkExperience}
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
          Add Work Experience
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>+</span>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitWorkExperience}
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

export default ExperienceModal;
