import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Fade,
  Link,
} from "@mui/material";
import heroImage from "../src/assets/dp.jpeg"; // 🔹 replace with your jewel image path

export default function LoginPage() {
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

          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
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
              type="password"
              variant="outlined"
              margin="normal"
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
                New here?{" "}
                <Link href="/register" underline="hover">
                  Create account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
