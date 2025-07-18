"use client";
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

const AwardsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  // Initialize state with an empty array regardless of existing data
  const [awards, setAwards] = useState([{ title: "", year: "", awarder: "" }]);

  // Optional: Reset awards state to empty fields when modal opens
  useEffect(() => {
    if (open) {
      setAwards([{ title: "", year: "", awarder: "" }]);
    }
  }, [open]);

  const handleAwardsChange = (index, field, value) => {
    const updatedAwards = [...awards];
    updatedAwards[index][field] = value;
    setAwards(updatedAwards);
  };

  const handleRemoveAward = (index) => {
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    if (updatedAwards.length === 0) {
      updatedAwards.push({ title: "", year: "", awarder: "" });
    }
    setAwards(updatedAwards);
  };

  const handleAddAward = () => {
    setAwards([...awards, { title: "", year: "", awarder: "" }]);
  };

  const handleSubmitAwards = () => {
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        awards: awards.filter(
          (award) => award.title || award.year || award.awarder
        ), // Remove empty awards before saving
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-awards"
      aria-describedby="modal-description-awards"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500, md: 600 }, // Responsive width
          maxHeight: "80vh", // Set a maximum height
          overflowY: "auto", // Enable vertical scrolling
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-awards" variant="h6" sx={{ mb: 2 }}>
          Awards
        </Typography>
        {awards.map((award, awardIndex) => (
          <div key={awardIndex} style={{ marginBottom: "1rem" }}>
            <TextField
              label="Award Title"
              value={award.title}
              onChange={(e) =>
                handleAwardsChange(awardIndex, "title", e.target.value)
              }
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Year"
              value={award.year}
              onChange={(e) =>
                handleAwardsChange(awardIndex, "year", e.target.value)
              }
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Awarder"
              value={award.awarder}
              onChange={(e) =>
                handleAwardsChange(awardIndex, "awarder", e.target.value)
              }
              fullWidth
              margin="normal"
              variant="outlined"
            />
            {awards.length > 1 && (
              <Button
                variant="outlined"
                sx={{
                  color: "var(optionalColor)",
                  mt: 1,
                }}
                onClick={() => handleRemoveAward(awardIndex)}
              >
                Remove Award
              </Button>
            )}
            <hr />
          </div>
        ))}
        {/* Button to add a new award */}
        <Button
          variant="outlined"
          onClick={handleAddAward}
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
            mt: 2, // Add margin at the top
            mb: 2, // Add margin at the bottom for spacing
          }}
        >
          Add more
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>+</span>{" "}
          {/* Add the plus icon */}
        </Button>
        {/* Button to save changes */}
        <Button
          sx={{
            backgroundColor: "var(--optionalColor)",
            "&:hover": {
              backgroundColor: "var(--optionalColor)", // Optional: Maintain the same color on hover
            },
            ml: 2,
            mt: 2,
          }}
          variant="contained"
          color="primary"
          onClick={handleSubmitAwards}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AwardsModal;
