import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function ContactUsPage() {
  const navigate = useNavigate();

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
          required
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
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

        {/* Company Phone Number (read-only text) */}
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
    </Box>
  );
}
