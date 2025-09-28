import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Alert,
  useMediaQuery,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

const API_URL = process.env.REACT_APP_API_URL;

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Menu & Logout handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLogoutDialogOpen(false);
    navigate("/login");
  };
  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    handleMenuClose();
  };
  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  // Auto logout logic
  useEffect(() => {
    const logoutAfterInactivity = 10 * 60 * 1000; // 10 minutes
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }, logoutAfterInactivity);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/orders/${orderId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch order details");
        }
        
        const data = await res.json();
        console.log("Order details:", data);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircleIcon sx={{ color: "green", mr: 1 }} />;
      case "shipped":
        return <LocalShippingIcon sx={{ color: "purple", mr: 1 }} />;
      case "paid":
        return <PaymentIcon sx={{ color: "blue", mr: 1 }} />;
      case "cancelled":
        return <CancelIcon sx={{ color: "red", mr: 1 }} />;
      default:
        return <PendingIcon sx={{ color: "orange", mr: 1 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return { bgcolor: "#e8f5e9", color: "green" };
      case "shipped":
        return { bgcolor: "#f3e5f5", color: "purple" };
      case "paid":
        return { bgcolor: "#e3f2fd", color: "blue" };
      case "cancelled":
        return { bgcolor: "#fbe9e7", color: "red" };
      default:
        return { bgcolor: "#fff3e0", color: "orange" };
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#B87333" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: "white", minHeight: "100vh", p: 3 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ bgcolor: "white", minHeight: "100vh", p: 3 }}>
        <Alert severity="info" sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
          Order not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          bgcolor: isSmallScreen ? "black" : "white",
          color: isSmallScreen ? "white" : "black",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#B87333", fontFamily: "serif" }}
          >
            Manhattan
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {username ? (
              <>
                <IconButton
                  sx={{ color: { xs: "white", md: "black" } }}
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                <Box>
                  <IconButton
                    sx={{ color: { xs: "white", md: "black" } }}
                    onClick={handleMenuOpen}
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>Hi, {username}</MenuItem>
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: "bold",
                    color: { xs: "white", md: "black" },
                    borderColor: { xs: "white", md: "black" },
                    "&:hover": {
                      bgcolor: { xs: "white", md: "black" },
                      color: { xs: "black", md: "white" },
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "white", color: "black", fontWeight: "bold" }}
                  onClick={() => navigate("/register")}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Back button */}
      <Box sx={{ px: 3, pt: 2 }}>
        <IconButton
          onClick={() => navigate("/orders")}
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

      <Box sx={{ px: 4, pb: 3, pt: 2 }}>
        {/* Order Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3E2723" }}>
                Order #{order.id}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", md: "flex-end" }, mb: 2 }}>
                {getStatusIcon(order.status)}
                <Chip
                  label={order.status.toUpperCase()}
                  sx={{
                    ...getStatusColor(order.status),
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#B87333" }}>
                Total: KES {parseFloat(order.total_price).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Order Items */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "#3E2723" }}>
            Order Items ({order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'})
          </Typography>

          {order.items && order.items.length > 0 ? (
            <Grid container spacing={3}>
              {order.items.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Grid container>
                      {/* Product Image */}
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          image={
                            item.product?.image1 
                              ? (item.product.image1.startsWith('http') 
                                  ? item.product.image1
                                  : `${API_URL}${item.product.image1}`)
                              : '/api/placeholder/200/200'
                          }
                          alt={item.product?.name || "Product"}
                          sx={{
                            objectFit: "contain",
                            maxWidth: 200, // adjust this size to match text width
                            maxHeight: 200, // keeps image proportional
                            width: "100%",
                            height: "auto",
                            mx: "auto", // center horizontally
                            display: "block",
                          }}
                        />
                      </Grid>

                      {/* Product Details */}
                      <Grid item xs={12} sm={9}>
                        <CardContent sx={{ p: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                {item.product?.name || "Unknown Product"}
                              </Typography>
                              
                              {item.product?.product_code && (
                                <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                                  Product Code: {item.product.product_code}
                                </Typography>
                              )}
                              
                              {item.product?.description && (
                                <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                                  {item.product.description}
                                </Typography>
                              )}

                              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                {item.product?.collection && (
                                  <Chip 
                                    label={`Collection: ${item.product.collection}`} 
                                    size="small" 
                                    variant="outlined"
                                  />
                                )}
                                {item.product?.color && (
                                  <Chip 
                                    label={`Color: ${item.product.color}`} 
                                    size="small" 
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B87333" }}>
                                  KES {parseFloat(item.price || 0).toLocaleString()}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                  Quantity: {item.quantity}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                  Subtotal: KES {parseFloat(item.total_price || 0).toLocaleString()}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No items found in this order.
            </Alert>
          )}

          {/* Order Summary */}
          {order.items && order.items.length > 0 && (
            <Box sx={{ mt: 3, pt: 3, borderTop: "2px solid #f0f0f0" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ color: "gray" }}>
                    Customer: {order.buyer || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
                  <Typography variant="body1">
                    Total Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#B87333", mt: 1 }}>
                    Order Total: KES {parseFloat(order.total_price).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#B87333" }} onClick={() => setLogoutDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetailsPage;