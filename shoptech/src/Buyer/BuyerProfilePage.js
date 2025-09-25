import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Button,
  CircularProgress,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_URL = process.env.REACT_APP_API_URL;

const BuyerProfilePage = () => {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(`${API_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        console.log("PROFILE RESPONSE:", data);
        setBuyer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#B87333" }} />
      </Box>
    );
  }

  if (!buyer) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          Failed to load profile. Please try again.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#5D4037", "&:hover": { bgcolor: "black" } }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", py: 6, px: 2 }}>
     

      <Paper
        elevation={6}
        sx={{
          maxWidth: 650,
          mx: "auto",
          p: 4,
          borderRadius: 4,
          bgcolor: "white",
        }}
      >
        {/* Avatar + Name */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              width: 110,
              height: 110,
              mx: "auto",
              bgcolor: "#B87333",
              fontSize: 40,
              boxShadow: 3,
            }}
          >
            {buyer.first_name?.[0]}
            {buyer.last_name?.[0]}
          </Avatar>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mt: 2, color: "#3E2723" }}
          >
            {buyer.first_name} {buyer.last_name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              bgcolor: "#e8f5e9",
              display: "inline-block",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: "0.8rem",
              mt: 1,
              color: "green",
            }}
          >
            {buyer.role.toUpperCase()}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Profile Details - Card layout */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 3, mb: 2, bgcolor: "#fafafa" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PersonIcon color="action" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Username
                  </Typography>
                  <Typography>{buyer.username}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 3, mb: 2, bgcolor: "#fafafa" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon color="action" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Email
                  </Typography>
                  <Typography>{buyer.email}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 3, mb: 2, bgcolor: "#fafafa" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PhoneIcon color="action" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Phone
                  </Typography>
                  <Typography>{buyer.phone_number || "N/A"}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 3, mb: 2, bgcolor: "#fafafa" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CakeIcon color="action" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Date of Birth
                  </Typography>
                  <Typography>{buyer.date_of_birth || "N/A"}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 3, mb: 2, bgcolor: "#fafafa" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocationOnIcon color="action" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    County
                  </Typography>
                  <Typography>{buyer.county || "N/A"}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#B87333",
              color: "white",
              px: 4,
              borderRadius: 3,
              "&:hover": { bgcolor: "black" },
            }}
            onClick={() => navigate(-1)}
          >
            GO BACK
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BuyerProfilePage;
