import React, { useState } from "react";
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
  useMediaQuery,
  InputAdornment,
  TextField,
  Menu,
  MenuItem
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
import { useNavigate } from "react-router-dom";

import ring from "../assets/ring.png";

const ProductDetailPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [ratingsAnchorEl, setRatingsAnchorEl] = useState(null);
  
  const productImages = [
    ring,
    ring,
    ring,
    ring
  ];

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleRatingsClick = (event) => {
    setRatingsAnchorEl(event.currentTarget);
  };

  const handleRatingsClose = () => {
    setRatingsAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Top Navbar */}
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          bgcolor: isSmallScreen ? "black" : "white",
          color: isSmallScreen ? "white" : "black",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#B87333",
              fontFamily: "serif",
              flexGrow: 1,
              textAlign: "left", 
            }}
          >
            Manhattan
          </Typography>

          {/* Right icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton sx={{ color: isSmallScreen ? "white" : "black" }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: isSmallScreen ? "white" : "black" }}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Back Arrow below navbar */}
      <Box sx={{ px: 2, mt: 2 }}>
        <IconButton
          onClick={() => navigate("/")}   // Goes back to previous page
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
          px: { xs: 2, sm: 3, md: 4 }  // Responsive padding
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
          }}
        >
          {/* Product Images */}
          <Grid item xs={12} md={6} sx={{ flex: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <Box
                  component="img"
                  src={productImages[selectedImageIndex]}
                  alt="The Perfect Hoop"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
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
                    fontSize: "0.8rem"
                  }}
                >
                  Best Seller
                </Box>
              </Paper>
              
              {/* Thumbnail Images */}
              <Box 
                sx={{ 
                  display: "flex", 
                  gap: 1, 
                  mt: 2,
                  justifyContent: "flex-start",
                  flexWrap: "wrap"
                }}
              >
                {productImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      border: index === selectedImageIndex ? "2px solid #B87333" : "1px solid #e0e0e0",
                      cursor: "pointer",
                      borderRadius: 1,
                      overflow: "hidden"
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Product view ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          
          {/* Product Info */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
              The Perfect Hoop
            </Typography>
            
            <Typography variant="h5" sx={{ fontWeight: "medium", mb: 2 }}>
              Ksh 2000
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
                mb: 3
              }}
            >
              ✓ more still in stock
            </Box>
            
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              This ring from the Loop Collection is crafted from stainless steel and 
              available in silver or 18K gold plating. It is waterproof, hypoallergenic, and 
              measures 11 mm in length and 2.8 mm in width.
            </Typography>
            
            {/* Quantity Selector */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton 
                onClick={() => handleQuantityChange(-1)} 
                disabled={quantity <= 1}
                sx={{
                  border: "1px solid #B87333", 
                  borderRadius: 1
                }}
              >
                <RemoveIcon sx={{ color: "#B87333" }}/>
              </IconButton>
              
              <Box 
                component="span" 
                sx={{ 
                  mx: 2, 
                  minWidth: "40px", 
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: "1.1rem"
                }}
              >
                {quantity}
              </Box>
              
              <IconButton 
                onClick={() => handleQuantityChange(1)}
                sx={{
                  border: "1px solid #B87333", 
                  borderRadius: 1
                }}
              >
                <AddIcon sx={{ color: "#B87333" }}/>
              </IconButton>
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#B87333",
                  color: "white",
                  py: 1.5,
                  mb: 1.5,
                  "&:hover": {
                    bgcolor: "#a56a2d"
                  }
                }}
              >
                ADD TO CART
              </Button>
              
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#c68c53",
                  color: "white",
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#b57d45"
                  }
                }}
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
            mt: 4
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
              Your satisfaction matters the world to us. We only replace items if 
              they are defective. If you need to exchange it for the same item.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#B87333", 
                cursor: "pointer",
                textDecoration: "underline"  
              }}
            >
              Learn More
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Share Button */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <IconButton
            size="small"
            sx={{ mr: 1, color: "text.secondary" }}
          >
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
                bgcolor: "#a56a2d"
              }
            }}
          >
            WRITE A REVIEW
          </Button>
          
          {/* Reviews Header */}
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Reviews
          </Typography>
          
          {/* Reviews Search and Filter */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
            <TextField
              placeholder="Search Review"
              variant="outlined"
              size="small"
              sx={{ 
                maxWidth: "200px", 
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
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
                  bgcolor: "#f5f5f5"
                }
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
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" fontWeight="medium" mr={1}>
                    Christina L.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
                    <VerifiedIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
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
                I love my little huggies! The small gemstones make it particularly unique huggies hoop while still being simple and elegant. I haven't seen this style anywhere else. The gold doesn't turn red and the clip helps the earring securely on.
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
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  Christina L.
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  1 month ago
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                I love my little huggies. The small gemstones make it particularly unique huggies hoop while still being simple and elegant. I haven't seen this style anywhere else. The gold doesn't turn red and the clip helps the earring securely on.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;