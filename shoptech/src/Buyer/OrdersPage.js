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


   // ✅ Menu & Logout
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

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
                <TableRow sx={{ bgcolor: "#3E2723" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Product
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Price
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
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product?.name || "N/A"}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>KES {order.total_price}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        sx={{
                          bgcolor:
                            order.status === "Delivered"
                              ? "#e8f5e9"
                              : order.status === "Pending"
                              ? "#fff3e0"
                              : "#fbe9e7",
                          color:
                            order.status === "Delivered"
                              ? "green"
                              : order.status === "Pending"
                              ? "orange"
                              : "red",
                          fontWeight: "bold",
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
                          bgcolor: "#5D4037",
                          "&:hover": { bgcolor: "black" },
                          borderRadius: 2,
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
