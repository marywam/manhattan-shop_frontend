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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Snackbar,
  Alert,
  useMediaQuery,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom"; // ✅ added useParams




const API_URL = process.env.REACT_APP_API_URL;

const ProductDetailPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { code } = useParams(); // ✅ get product_code from URL
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [ratingsAnchorEl, setRatingsAnchorEl] = useState(null);
  const [product, setProduct] = useState(null); // ✅ product from API

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [username, setUsername] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");
  const getToken = () => localStorage.getItem("token");

  // ✅ Set username if stored
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    console.log(localStorage.getItem("username"));
    if (storedUser) setUsername(storedUser);
  }, []);

   // ----- AUTO LOGOUT -----
       useEffect(() => {
        const logoutAfterInactivity = 10 * 60 * 1000; // 10 minutes in ms
        let timer;
    
        const resetTimer = () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            // Perform logout
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/login");
          }, logoutAfterInactivity);
        };
    
        // Reset timer on user activity
        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetTimer));
    
        // Start initial timer
        resetTimer();
    
        // Cleanup
        return () => {
          clearTimeout(timer);
          events.forEach((event) =>
            window.removeEventListener(event, resetTimer)
          );
        };
      }, [navigate]);

  // ✅ fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${API_URL}/products/${code}/`, {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });

        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [code]);

  if (!product) return <Typography>Loading...</Typography>;

  

 
  

// ✅ Add to Cart
// ✅ Update addToCart to use this
const addToCart = async () => {
  const token = getToken();
  if (!token) {
    alert("Please log in first");
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_code: product.product_code,
        quantity,
      }),
    });

    if (response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      const data = await response.json();
      console.error("Add to cart failed:", data);
      console.error("Status:", response.status);
      console.error("Status Text:", response.statusText);
      alert("Failed to add product to cart. Check console for details.");
      return;
    }

    navigate("/cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Something went wrong. Please try again.");
  }
};


  

  const productImages = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean); // ✅ only keep available images

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

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

  const handleRatingsClick = (event) => {
    setRatingsAnchorEl(event.currentTarget);
  };

  const handleRatingsClose = () => {
    setRatingsAnchorEl(null);
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
                  sx={{
                    color: { xs: "white", md: "black" },
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                <Box>
                  <IconButton
                    sx={{
                      color: { xs: "white", md: "black" },
                    }}
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

      {/* ✅ Back Arrow below navbar */}
      <Box sx={{ px: 2, mt: 2 }}>
        <IconButton
          onClick={() => navigate(-1)} // ✅ go back
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

      {/* Product Detail Content */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                {product.best_seller && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      bgcolor: "black",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.8rem",
                    }}
                  >
                    Best Seller
                  </Box>
                )}
              </Paper>

              {/* Thumbnail Images */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                {productImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      border:
                        index === selectedImageIndex
                          ? "2px solid #B87333"
                          : "1px solid #e0e0e0",
                      cursor: "pointer",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Product view ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {product.name}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "medium", mb: 2 }}>
              {product.discount_price ? (
                <>
                  <span style={{ color: "green" }}>
                    Ksh {product.discount_price}
                  </span>{" "}
                  <span
                    style={{ textDecoration: "line-through", color: "gray" }}
                  >
                    Ksh {product.price}
                  </span>
                </>
              ) : (
                <>Ksh {product.price}</>
              )}
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
                mb: 3,
              }}
            >
              ✓ {product.stock} more still in stock
            </Box>

            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              {product.description}
            </Typography>

            {/* Quantity Selector */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                sx={{ border: "1px solid #B87333", borderRadius: 1 }}
              >
                <RemoveIcon sx={{ color: "#B87333" }} />
              </IconButton>

              <Box
                sx={{
                  mx: 2,
                  minWidth: "40px",
                  textAlign: "center",
                  fontSize: "1.1rem",
                }}
              >
                {quantity}
              </Box>

              <IconButton
                onClick={() => handleQuantityChange(1)}
                sx={{ border: "1px solid #B87333", borderRadius: 1 }}
              >
                <AddIcon sx={{ color: "#B87333" }} />
              </IconButton>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#B87333", color: "white", mb: 1.5 }}
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#c68c53", color: "white" }}
              >
                ORDER NOW
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Delivery and Return Information */}
        <Accordion
          sx={{
            boxShadow: "none",
            "&:before": { display: "none" },
            mt: 4,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 0, color: "text.primary" }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Delivery and Return
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Returns / Exchanges
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Your satisfaction matters the world to us. We only replace items
              if they are defective. If you need to exchange it for the same
              item.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#B87333",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Learn More
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Share Button */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <IconButton size="small" sx={{ mr: 1, color: "text.secondary" }}>
            <ShareIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Share
          </Typography>
        </Box>

        {/* Reviews Section */}
        <Box sx={{ mt: 7, mb: 8 }}>
          {/* Write a Review Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#B87333",
              color: "white",
              py: 1.5,
              mb: 4,
              "&:hover": {
                bgcolor: "#a56a2d",
              },
            }}
          >
            WRITE A REVIEW
          </Button>

          {/* Reviews Header */}
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Reviews
          </Typography>

          {/* Reviews Search and Filter */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search Review"
              variant="outlined"
              size="small"
              sx={{
                maxWidth: "200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleRatingsClick}
              sx={{
                border: "1px solid #e0e0e0",
                color: "text.primary",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              All Ratings
            </Button>
            <Menu
              anchorEl={ratingsAnchorEl}
              open={Boolean(ratingsAnchorEl)}
              onClose={handleRatingsClose}
            >
              <MenuItem onClick={handleRatingsClose}>All Ratings</MenuItem>
              <MenuItem onClick={handleRatingsClose}>5 Stars</MenuItem>
              <MenuItem onClick={handleRatingsClose}>4 Stars</MenuItem>
              <MenuItem onClick={handleRatingsClose}>3 Stars</MenuItem>
              <MenuItem onClick={handleRatingsClose}>2 Stars</MenuItem>
              <MenuItem onClick={handleRatingsClose}>1 Star</MenuItem>
            </Menu>
          </Box>

          {/* Reviews List */}
          <Box>
            {/* Review 1 */}
            <Box sx={{ mb: 4, pb: 4, borderBottom: "1px solid #e0e0e0" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {/* 5 star rating */}
                <Box sx={{ display: "flex", color: "#FFD700" }}>
                  {"★★★★★".split("").map((star, index) => (
                    <Typography key={index} variant="body1" component="span">
                      {star}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" fontWeight="medium" mr={1}>
                    Christina L.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "primary.main",
                    }}
                  >
                    <VerifiedIcon
                      fontSize="small"
                      sx={{ mr: 0.5, color: "primary.main" }}
                    />
                    <Typography variant="body2" color="primary">
                      Verified User
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  1 month ago
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                I love my little huggies! The small gemstones make it
                particularly unique huggies hoop while still being simple and
                elegant. I haven't seen this style anywhere else. The gold
                doesn't turn red and the clip helps the earring securely on.
              </Typography>
            </Box>

            {/* Review 2 */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {/* 5 star rating */}
                <Box sx={{ display: "flex", color: "#FFD700" }}>
                  {"★★★★★".split("").map((star, index) => (
                    <Typography key={index} variant="body1" component="span">
                      {star}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  Christina L.
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  1 month ago
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                I love my little huggies. The small gemstones make it
                particularly unique huggies hoop while still being simple and
                elegant. I haven't seen this style anywhere else. The gold
                doesn't turn red and the clip helps the earring securely on.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please log in or sign up first to view products.
        </Alert>
      </Snackbar>

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

export default ProductDetailPage;
