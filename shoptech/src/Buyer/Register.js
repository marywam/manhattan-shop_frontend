import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    county: "",
    password: "",
    password2: "",
  });

   // Snackbar state
   const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // "error", "success", "info", "warning"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => value.trim() === ""
    );
    if (emptyFields.length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.password2) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register/`,
        formData
      );
      setSnackbar({
        open: true,
        message: "Account created successfully!",
        severity: "success",
      });
      console.log("Success:", response.data);

      // Optionally redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.detail ||
          "Failed to register. Please try again.",
        severity: "error",
      });
      console.error("Error:", error.response?.data || error.message);
    }
  };


  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          borderRadius: 5,
          p: { xs: 4, md: 5 },
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "black",
            mb: 2,
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            name="first_name"
            fullWidth
            required
            value={formData.first_name}
            onChange={handleChange}
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
            label="Last Name"
            name="last_name"
            fullWidth
            required
            value={formData.last_name}
            onChange={handleChange}
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
            label="Username"
            name="username"
            fullWidth
            required
            value={formData.username}
            onChange={handleChange}
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
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
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
            label="Phone Number"
            name="phone_number"
            fullWidth
            value={formData.phone_number}
            onChange={handleChange}
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
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            fullWidth
            
            value={formData.date_of_birth}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "black" , shrink: false} }}
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
            label="County"
            name="county"
            fullWidth
            value={formData.county}
            onChange={handleChange}
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
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
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
            label="Confirm Password"
            name="password2"
            type="password"
            fullWidth
            required
            value={formData.password2}
            onChange={handleChange}
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#B87333",
              "&:hover": { backgroundColor: "black", color: "white" },
              color: "black",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.2,
            }}
          >
            Sign Up
          </Button>

          <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.90 }}>
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
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
