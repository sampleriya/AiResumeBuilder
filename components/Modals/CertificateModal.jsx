"use client"
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

const CertificateModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  // Initialize state with an empty certification array
  const [certifications, setCertifications] = useState([{ title: "", year: "", authority: "" }]);

  // Reset certifications to empty when the modal opens
  useEffect(() => {
    if (open) {
      setCertifications([{ title: "", year: "", authority: "" }]);
    }
  }, [open]);

  const handleCertificationsChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    if (updatedCertifications.length === 0) {
      updatedCertifications.push({ title: "", year: "", authority: "" });
    }
    setCertifications(updatedCertifications);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { title: "", year: "", authority: "" },
    ]);
  };

  const handleSubmitCertifications = () => {
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        certification: certifications.filter(cert => cert.title || cert.year || cert.authority),  // Remove empty certifications before saving
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-certifications"
      aria-describedby="modal-description-certifications"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', sm: '80%', md: 600 }, 
          maxHeight: "80vh",  // Set a maximum height
          overflowY: "auto",   // Enable vertical scrolling
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-certifications" variant="h6">
          Certifications
        </Typography>
        {certifications.map((cert, certIndex) => (
          <div key={certIndex}>
            <TextField
              label="Certification Title"
              value={cert.title}
              onChange={(e) =>
                handleCertificationsChange(certIndex, "title", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={cert.year}
              onChange={(e) =>
                handleCertificationsChange(certIndex, "year", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Authority"
              value={cert.authority}
              onChange={(e) =>
                handleCertificationsChange(
                  certIndex,
                  "authority",
                  e.target.value
                )
              }
              fullWidth
              margin="normal"
            />
            <Button
              variant="outlined"
              onClick={() => handleRemoveCertification(certIndex)}
            >
              Remove Certification
            </Button>
            <hr />
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={handleAddCertification}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--optionalColor)",  // Match the border color
            color: "var(--optionalColor)",  // Match the text color
            backgroundColor: "#fff",  // White background
            borderRadius: "20px",  // Rounded border
            padding: "6px 12px",  // Adjust padding for better spacing
            textTransform: "none",  // Keep the text case as is
            fontSize: "14px",  // Set a custom font size
            "&:hover": {
              backgroundColor: "#f0f0f0",  // Light gray background on hover
              borderColor: "var(--optionalColor)",  // Border color remains the same
            },
          }}
        >
          Add more
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>+</span>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitCertifications}
          sx={{
            backgroundColor: "var(--optionalColor)",
            "&:hover": {
              backgroundColor: "var(--optionalColor)", // Optional: Maintain the same color on hover
            },
            marginLeft: "10px",
            marginTop:"1rem"
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CertificateModal;
