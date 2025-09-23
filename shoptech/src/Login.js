import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Fade,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import heroImage from "../src/assets/dp.jpeg"; // 🔹 replace with your jewel image path

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // "error", "success", etc.
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.email || !formData.password) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/`,
        formData
      );

      // Successful login
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Save JWT token
      localStorage.setItem("token", response.data.access); // access token

      // Save username from nested user object
      localStorage.setItem("username", response.data.user.username);
      // Redirect to dashboard/home page after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.detail ||
          "Login failed. Please check your credentials.",
        severity: "error",
      });
      console.error("Login error:", error.response || error.message);
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { md: 520 },
        }}
      >
        {/* Left / Hero Section */}
        <Box
          sx={{
            flex: { md: 1 },
            background: `linear-gradient(135deg, rgba(184,115,51,0.65), rgba(0,0,0,0.7)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: { xs: 4, md: 5 },
            minHeight: { xs: 220, md: "auto" },
          }}
        >
          <Fade in timeout={800}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                Welcome Back 🪞
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1.2,
                  maxWidth: 380,
                  opacity: 0.92,
                  fontSize: 15,
                  lineHeight: 1.45,
                }}
              >
                Discover elegance in every jewel piece. Please login to continue
                exploring our exclusive collection.
              </Typography>
            </Box>
          </Fade>
        </Box>

        {/* Right / Form Section */}
        <Box
          sx={{
            flex: { md: 1 },
            p: { xs: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "center",
            bgcolor: "white",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "black",
                mb: 0.5,
              }}
            >
              Sign In
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75, color: "black" }}>
              Use your email and password to login.
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email" // 🔹 Add name
              type="email"
              variant="outlined"
              margin="normal"
              value={formData.email} // 🔹 Bind value
              onChange={handleChange} // 🔹 Bind change handler
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#B87333" },
                  "&:hover fieldset": { borderColor: "#B87333" },
                  "&.Mui-focused fieldset": { borderColor: "#B87333" },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password" // 🔹 Add name
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password} // 🔹 Bind value
              onChange={handleChange} // 🔹 Bind change handler
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#B87333" },
                  "&:hover fieldset": { borderColor: "#B87333" },
                  "&.Mui-focused fieldset": { borderColor: "#B87333" },
                },
              }}
            />

            <Button
              type="submit" // 🔹 Make it submit the form
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#B87333",
                "&:hover": { backgroundColor: "black", color: "white" },
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                py: 1.2,
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
