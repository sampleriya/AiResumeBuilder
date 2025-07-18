"use client";
import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

// Import the Chatbot component (make sure you have this component created)
import Chatbot from "../Chatbot/Chatbot"; // Adjust the import path as needed

const SkillsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  const [skills, setSkills] = useState(""); // Initialize with an empty string
  const [isClicked, setIsClicked] = useState(false); // State to manage chatbot visibility

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleSubmitSkills = () => {
    const skillsArray = skills.split(",").map((skill) => skill.trim());
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        skills: skillsArray,
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-skills"
      aria-describedby="modal-description-skills"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', sm: '80%', md: 400 }, 
          height: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-skills" variant="h6">
          Skills
        </Typography>
        <TextField
          label="Skills (comma separated)"
          value={skills}
          onChange={handleSkillsChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleSubmitSkills}
          sx={{
            backgroundColor: "var(--optionalColor)",
            "&:hover": {
              backgroundColor: "var(--optionalColor)", // Optional: Maintain the same color on hover
            },
          }}
        >
          Save
        </Button>

        {/* Chatbot Icon and Conditional Rendering */}
       
      </Box>
    </Modal>
  );
};

export default SkillsModal;
