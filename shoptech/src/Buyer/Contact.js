import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ContactUsPage() {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!fullName || !phoneNumber || !message) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields!",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact/`, {
        full_name: fullName,
        phone_number: phoneNumber,
        message: message,
      });

      // Success snackbar
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });

      // Clear form
      setFullName("");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to send message. Try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", p: 3 }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "#B87333",
          color: "white",
          mb: 2,
          "&:hover": { bgcolor: "black" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#B87333",
          mb: 4,
          fontFamily: "serif",
        }}
      >
        Contact Us
      </Typography>

      {/* Contact Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#B87333",
            "&:hover": { bgcolor: "black" },
            color: "white",
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          Send Message
        </Button>

        {/* Company Phone Number */}
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
          }}
        >
          📞 Call us: +254 704909172
        </Typography>
      </Box>

      {/* Snackbar Notification at Top Center */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
