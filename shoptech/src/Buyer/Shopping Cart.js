import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
  Container,
  TextField,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const ShoppingCartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderNote, setOrderNote] = useState("");

  // ✅ Fetch cart items
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCartItems(
        data.items.map((item) => ({
          id: item.id,
          productId: item.product.id,
          name: item.product.name,
          price: item.product.discount_price || item.product.price,
          quantity: item.quantity,
          image: item.product.image1 || "",
          stock: item.product.stock || "",
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load cart. Please refresh.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  // ✅ Update quantity
  const handleQuantityChange = async (id, amount) => {
    const item = cartItems.find((i) => i.id === id);
    const newQuantity = Math.max(1, item.quantity + amount);
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/cart/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCartItems(
        cartItems.map((i) =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
                  <Badge
                    badgeContent={cartItems.length}
                    color="error"
                    overlap="circular"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
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

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "medium", mb: 6 }}
        >
          SHOPPING CART
        </Typography>

        {/* ✅ Table for larger screens */}
        {!isSmallScreen ? (
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              overflowX: "auto",
              mb: 4,
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", pl: 2 }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Stock
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", pr: 2 }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ pl: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <Box>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ksh {item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          bgcolor: "#e8f5e9",
                          color: "green",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.stock}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, -1)}
                          size="small"
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 0,
                            p: 0.5,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, 1)}
                          size="small"
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 0,
                            p: 0.5,
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 2 }}>
                      <Typography variant="body1">
                        Ksh {(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* ✅ Card layout for small screens */
          <Grid 
          container 
          spacing={2} 
          sx={{ mb: 4 }} 
          direction="column"   // ✅ force vertical stacking
        >
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Paper
                elevation={2}
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  border: "1px solid #eee", 
                  maxWidth: 400,          // ✅ Limit width
                  mx: "auto",             // ✅ Center horizontally
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ksh {item.price.toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: "#e8f5e9",
                      color: "green",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.9rem",
                      width: "fit-content",
                    }}
                  >
                    {item.stock}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 0,
                        p: 0.5,
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 0,
                        p: 0.5,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" fontWeight="bold">
                    Total: Ksh {(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        )}

        <Divider sx={{ mb: 4 }} />

        {/* Order Note & Summary */}
        <Grid container spacing={3} direction={isSmallScreen ? "column" : "row"}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Add Order Note
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="How can we help you?"
              variant="outlined"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: isSmallScreen ? "left" : "right" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                SUBTOTAL: Ksh {calculateSubtotal().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Shipping calculated at checkout.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#B87333",
                  color: "white",
                  py: 1.5,
                  "&:hover": { bgcolor: "#a56a2d" },
                }}
              >
                CHECK OUT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

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

export default ShoppingCartPage;
