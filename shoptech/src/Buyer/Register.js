import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // 🔹 Later: integrate axios.post("API_URL/register/", formData)
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
        </Box>
      </Paper>
    </Container>
  );
}
