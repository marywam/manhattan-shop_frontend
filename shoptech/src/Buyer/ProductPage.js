import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Snackbar,
  Alert,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const API_URL = process.env.REACT_APP_API_URL;

export default function ProductsPage() {
  const { group } = useParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [username, setUsername] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const [selectedFilters, setSelectedFilters] = useState({
    collection: "",
    color: "",
    size: "",
    price: "",
  });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/?group=${group}`);
        const data = await response.json();
        setAllProducts(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [group, isLoggedIn]);

  // ✅ Set username if stored
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  // ✅ Derive filters dynamically from products
  const filters = {
    collections: [
      ...new Set(allProducts.map((p) => p.collection).filter(Boolean)),
    ],
    colors: [...new Set(allProducts.map((p) => p.color).filter(Boolean))],
    sizes: [...new Set(allProducts.map((p) => p.size).filter(Boolean))],
    prices: [...new Set(allProducts.map((p) => p.price).filter(Boolean))],
  };

  // ✅ Apply filters
  const handleFilterChange = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));

    let filtered = allProducts;

    if (field === "collection" && value) {
      filtered = filtered.filter((p) => p.collection === value);
    }
    if (field === "color" && value) {
      filtered = filtered.filter((p) => p.color === value);
    }
    if (field === "size" && value) {
      filtered = filtered.filter((p) => p.size === value);
    }
    if (field === "price" && value) {
      filtered = filtered.filter((p) => String(p.price) === String(value));
    }

    setProducts(filtered);
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

      {/* Back Button */}
      <Box sx={{ px: 2, mt: 2 }}>
        <IconButton
          onClick={() => navigate("/")}
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

      {/* Header */}
      <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          MANHATTAN {group?.toUpperCase()}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Explore our collection of {group}, handpicked for elegance and style.
        </Typography>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          px: 2,
          mb: 4,
        }}
      >
        {/* Collection */}
        <Select
          value={selectedFilters.collection}
          displayEmpty
          sx={{ minWidth: 150, borderRadius: 2 }}
          onChange={(e) => handleFilterChange("collection", e.target.value)}
        >
          <MenuItem value="">Collection</MenuItem>
          {filters.collections.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>

        {/* Color */}
        <Select
          value={selectedFilters.color}
          displayEmpty
          sx={{ minWidth: 150, borderRadius: 2 }}
          onChange={(e) => handleFilterChange("color", e.target.value)}
        >
          <MenuItem value="">Color</MenuItem>
          {filters.colors.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>

        {/* Size */}
        <Select
          value={selectedFilters.size}
          displayEmpty
          sx={{ minWidth: 150, borderRadius: 2 }}
          onChange={(e) => handleFilterChange("size", e.target.value)}
        >
          <MenuItem value="">Size</MenuItem>
          {filters.sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>

        {/* Price */}
        <Select
          value={selectedFilters.price}
          displayEmpty
          sx={{ minWidth: 150, borderRadius: 2 }}
          onChange={(e) => handleFilterChange("price", e.target.value)}
        >
          <MenuItem value="">Price</MenuItem>
          {filters.prices.map((p) => (
            <MenuItem key={p} value={p}>
              Ksh {p}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 3,
          maxWidth: "1000px",
          mx: "auto",
          pb: 6,
          px: { xs: 2, md: 0 },
        }}
      >
        {isLoggedIn &&
          products.map((product) => (
            <Box key={product.product_code} sx={{ textAlign: "center" }}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    "&:hover img": {
                      filter: "blur(4px)",
                      transform: "scale(1.05)",
                    },
                    "&:hover .cart-icon": {
                      opacity: 1,
                      transform: "translate(-50%, -50%) scale(1)",
                    },
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    height="350"
                    image={product.image1}
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      transition: "all 0.4s ease",
                    }}
                  />

                  {/* Dark Overlay */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0,0,0,0.3)", // ✅ dark overlay
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                      zIndex: 1,
                    }}
                  />

                  {/* Best Seller Badge */}
                  {product.best_seller && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: "black",
                        color: "white",
                        px: 1,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        zIndex: 2,
                      }}
                    >
                      Best Seller
                    </Box>
                  )}

                  {/* Cart Icon Overlay */}
                  <Box
                    className="cart-icon"
                    onClick={() => navigate(`/cart/${product.product_code}`)}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(0.8)",
                      opacity: 0,
                      transition: "all 0.4s ease",
                      cursor: "pointer",
                      bgcolor: "#B87333", // ✅ Brown background
                      borderRadius: "50%",
                      p: 2,
                      zIndex: 2, // ✅ above overlay
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{ color: "white", fontSize: 40 }}
                    />
                  </Box>
                </Box>
              </Card>

              <Typography variant="subtitle1" sx={{ fontWeight: "500", mt: 1 }}>
                {product.name}
              </Typography>
              {/* ✅ If product has a discount */}
              {product.discount_price ? (
                <Box sx={{ mt: 1 }}>
                  {/* Discount Price */}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "green" }}
                  >
                    Ksh {product.discount_price}
                  </Typography>

                  {/* Original Price (crossed out) */}
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    Ksh {product.price}
                  </Typography>

                  {/* Discount Percentage */}
                  <Typography
                    variant="body2"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    {Math.round(product.discount_percentage)}%
                  </Typography>
                </Box>
              ) : (
                /* ✅ If no discount */
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", mt: 1, color: "black" }}
                >
                  Ksh {product.price}
                </Typography>
              )}
            </Box>
          ))}
      </Box>

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
}
