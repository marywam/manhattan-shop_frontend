import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function MpesaForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone:", `+254${phone}`);
    // 👉 call your MPESA API here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back Button */}
      <Box sx={{ px: 2, py: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: "#B87333",
            border: "1px solid #B87333",
            borderRadius: 2,
            "&:hover": { bgcolor: "#B87333", color: "white" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Centered Card */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: 600,
            bgcolor: "white",
            color: "black",
            borderRadius: 3,
            boxShadow: 6,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              MPESA Payment
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, ""); // only digits
                  if (input.length <= 9) {
                    setPhone(input); // only allow 9 digits after +254
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        src="https://i.pinimg.com/originals/34/5e/9f/345e9f8f6feff89ee49741db049a22cd.jpg"
                        alt="Kenya"
                        width="24"
                        style={{
                          borderRadius: "4px",
                          marginRight: "6px",
                        }}
                      />
                      <Typography sx={{ fontWeight: "bold" }}>+254</Typography>
                    </InputAdornment>
                  ),
                }}
                placeholder="7XXXXXXXX"
                inputProps={{
                  maxLength: 9, // only 9 digits after +254
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#B87333",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B87333",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#B87333",
                    },
                    color: "black",
                  },
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#B87333",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "black" },
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                MPESA PAY
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
