"use client"
import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setResumeDataIT3 } from "../../store";

const ContactInfoModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const resumeDataIT3 = useSelector((state) => state.resumeDataIT3);

  // Initialize state with empty contact info
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    name: "",
    linkedinUrl :""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSubmitContactInfo = () => {
    dispatch(
      setResumeDataIT3({
        ...resumeDataIT3,
        contactInfo: contactInfo,
        name: contactInfo.name,
        linkedinUrl :contactInfo.linkedinUrl 
      })
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title-contact"
      aria-describedby="modal-description-contact"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', sm: '80%', md: 400 }, 
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title-contact" variant="h6">
          Contact Info
        </Typography>
        <TextField
          label="Phone"
          name="phone"
          value={contactInfo.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={contactInfo.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={contactInfo.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={contactInfo.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="LinkedIn URL"
          name="linkedinUrl"
          value={contactInfo.linkedinUrl }
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitContactInfo}
          sx={{
            backgroundColor: "var(--optionalColor)",
            "&:hover": {
              backgroundColor: "var(--optionalColor)", // Optional: Maintain the same color on hover
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ContactInfoModal;
