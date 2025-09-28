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
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function MpesaForm({ order }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debug logging
  console.log("MpesaForm received order:", order);

  const handlePayNow = async (e) => {
    e.preventDefault();

    // Validation
    if (!phone || phone.length < 9) {
      alert("Please enter a valid phone number");
      return;
    }

    if (!order || !order.id) {
      alert("No order found. Please go back and complete checkout.");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      console.log("Sending payment request:", {
        phone_number: `254${phone}`,
        order_id: order.id,
      });

      const res = await axios.post(
        `${API_URL}/mpesa/pay/`, // Fixed URL
        {
          phone_number: `254${phone}`,
          order_id: order.id,
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("M-Pesa STK push response:", res.data);
      
      if (res.data.success) {
        alert("📲 STK push sent! Check your phone to complete payment.");
        
        // Start polling for payment status
        pollPaymentStatus(order.id);
      } else {
        alert("Failed to initiate payment: " + (res.data.error || "Unknown error"));
      }

    } catch (err) {
      console.error("Payment error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          err.message || 
                          "Failed to initiate payment";
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Poll for payment status
  const pollPaymentStatus = (orderId) => {
    let attempts = 0;
    const maxAttempts = 60; // Poll for 3 minutes (60 * 3 seconds)
    
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/orders/${orderId}/payment-status/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const status = response.data;
        console.log("Payment status check:", status);
        
        if (status.order_status === 'paid') {
          alert("Payment successful! 🎉");
          navigate(`/order-success/${orderId}`);
          return;
        } 
        
        if (status.transaction_status === 'failed') {
          alert("Payment failed. Please try again.");
          return;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 3000); // Check every 3 seconds
        } else {
          alert("Payment status check timed out. Please check your order status manually.");
        }
        
      } catch (error) {
        console.error("Status check error:", error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 3000);
        }
      }
    };
    
    // Start checking after a delay
    setTimeout(checkStatus, 5000); // Wait 5 seconds before first check
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

            {/* Order Info */}
            {order && (
              <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="subtitle2">Order #{order.id}</Typography>
                <Typography variant="h6" color="#B87333" fontWeight="bold">
                  Total: KSh {parseFloat(order.total_price).toLocaleString()}
                </Typography>
              </Box>
            )}

            <form onSubmit={handlePayNow}>
              <TextField
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, "");
                  if (input.length <= 9) {
                    setPhone(input);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        src="https://i.pinimg.com/originals/34/5e/9f/345e9f8f6feff89ee49741db049a22cd.jpg"
                        alt="Kenya"
                        width="24"
                        style={{ borderRadius: "4px", marginRight: "6px" }}
                      />
                      <Typography sx={{ fontWeight: "bold" }}>+254</Typography>
                    </InputAdornment>
                  ),
                }}
                placeholder="7XXXXXXXX"
                inputProps={{ maxLength: 9 }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#B87333" },
                    "&:hover fieldset": { borderColor: "#B87333" },
                    "&.Mui-focused fieldset": { borderColor: "#B87333" },
                  },
                  "& .MuiInputBase-input": { color: "black" },
                }}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading || !phone || phone.length < 9}
                sx={{
                  bgcolor: "#B87333",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "black" },
                  "&:disabled": { bgcolor: "#ccc" },
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                {isLoading ? "Processing..." : "MPESA PAY"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}