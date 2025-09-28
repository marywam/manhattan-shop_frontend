import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Chip,
  AppBar,
  useMediaQuery,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const API_URL = process.env.REACT_APP_API_URL;

const BuyerOrdersPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [username, setUsername] = useState("");

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
    const logoutAfterInactivity = 10 * 60 * 1000; // 10 minutes in ms
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
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);
      
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        console.log("Orders data:", data); // Debug log
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to get order items for display
  const getOrderDisplayItems = (order) => {
    if (!order.items || order.items.length === 0) {
      return [{ product: { name: "No items" }, quantity: 0, price: 0 }];
    }
    return order.items;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#5D4037" }} />
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
                    <MenuItem disabled>👋 Hi, {username}</MenuItem>
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
      <Box sx={{ px: 2, mt: 2 }}>
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
      
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 4,
          borderRadius: 4,
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#3E2723",
            textAlign: "center",
          }}
        >
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "gray", mt: 5 }}
          >
            You have no orders yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#B87333" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Products
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total Items
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  const orderItems = getOrderDisplayItems(order);
                  const totalItems = orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
                  
                  return (
                    <TableRow key={order.id} hover>
                      <TableCell sx={{ textAlign: 'center' }}>{order.id}</TableCell>
                      <TableCell>
                        {orderItems.length > 1 ? (
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {orderItems.length} different products:
                            </Typography>
                            {orderItems.slice(0, 2).map((item, index) => (
                              <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem' }}>
                                • {item.product?.name || "Unknown"} ({item.quantity})
                              </Typography>
                            ))}
                            {orderItems.length > 2 && (
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                                ...and {orderItems.length - 2} more
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            {orderItems[0]?.product?.name || "No items"}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{totalItems}</TableCell>
                      <TableCell>KES {order.total_price}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          sx={{
                            bgcolor:
                              order.status === "delivered"
                                ? "#e8f5e9"
                                : order.status === "pending"
                                ? "#fff3e0"
                                : order.status === "paid"
                                ? "#e3f2fd"
                                : order.status === "shipped"
                                ? "#f3e5f5"
                                : "#fbe9e7",
                            color:
                              order.status === "delivered"
                                ? "green"
                                : order.status === "pending"
                                ? "orange"
                                : order.status === "paid"
                                ? "blue"
                                : order.status === "shipped"
                                ? "purple"
                                : "red",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: "#B87333",
                            "&:hover": { bgcolor: "black" },
                            borderRadius: 2,
                          }}
                          onClick={() => navigate(`/view/${order.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Logout Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#B87333" }}
            onClick={() => setLogoutDialogOpen(false)}
          >
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

export default BuyerOrdersPage;