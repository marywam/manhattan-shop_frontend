import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Card,
  Link,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BrownImage from "../assets/Brown.png";

// brand icons
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import Earring from "../assets/earring.png";
import Bangle from "../assets/bangle.png";
import Necklace from "../assets/necklace.png";
import Ring from "../assets/ring.png";
import silver from "../assets/silverHoops.png";
import silver1 from "../assets/silverHoops1.png";
import silver2 from "../assets/silverHoops4.png";
import silver3 from "../assets/SilverHoops3.png";

import dp from "../assets/dp2.png";

export default function HomePage() {
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const dealsRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navLinks = ["Category", "About", "Deals", "Contact"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Dialog state
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const confirmLogout = () => {
    // Perform logout
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true); // Open the confirmation dialog
    handleMenuClose();
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile"); // Adjust to your profile route
  };

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
          {/* Left: Menu toggle on small screens */}
          {isSmallScreen && (
            <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Drawer for small screens */}
          <Drawer
  anchor="left"
  open={open}
  onClose={() => setOpen(false)}
  PaperProps={{
    sx: { width: 250, bgcolor: "black", color: "white" },
  }}
>
  <List>
    {navLinks.map((text) => (
      <ListItem
        button
        key={text}
        onClick={() => {
          setOpen(false);

          setTimeout(() => {
            if (text === "About") aboutRef.current?.scrollIntoView({ behavior: "smooth" });
            if (text === "Category") productsRef.current?.scrollIntoView({ behavior: "smooth" });
            if (text === "Deals") dealsRef.current?.scrollIntoView({ behavior: "smooth" });
            if (text === "Contact") navigate("/contactUs");
          }, 300);
        }}
      >
        <ListItemText primary={text} />
      </ListItem>
    ))}

    {/* Auth Section */}
    {username ? (
      <>
        
      

        {/* Logout Button at bottom */}
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "white", color: "black" },
            }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Box>
      </>
    ) : (
      <>
        <ListItem button onClick={() => navigate("/login")}>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button onClick={() => navigate("/register")}>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </>
    )}
  </List>
</Drawer>


          {/* Center: Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#B87333",
              fontFamily: "serif",
              flexGrow: isSmallScreen ? 1 : 0,
              textAlign: "center",
            }}
          >
            Manhattan
          </Typography>

          {/* Nav Links - visible only on large screens */}
          {!isSmallScreen && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link}
                  color="inherit"
                  onClick={() => {
                    if (link === "About") {
                      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
                    }
                    if (link === "Category") {
                      productsRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                    if (link === "Deals") {
                      dealsRef.current?.scrollIntoView({ behavior: "smooth" });
                    }

                    if (link === "Contact") {
                      navigate("/contactUs"); // 👈 Go to contact page
                    }
                    // later handle Shop, Contact, etc.
                  }}
                >
                  {link}
                </Button>
              ))}
            </Box>
          )}

          {/* Right: Icons */}
          {/* Right: Icons / Login & Signup */}
<Box sx={{ display: "flex", gap: 1, zIndex: 2 }}>
  {username ? (
    // User is logged in
    <>
      <IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
        <ShoppingCartOutlinedIcon />
      </IconButton>
      <Box>
        <IconButton sx={{ color: "white" }} onClick={handleMenuOpen}>
          <PersonOutlineOutlinedIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem disabled>👋 Hi, {username}</MenuItem>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  ) : (
    // User not logged in
    <>
      <Button
        variant="outlined"
        sx={{ color: "white", borderColor: "white", fontWeight: "bold" }}
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


          {/* Black block only for large screens */}
          {!isSmallScreen && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "black",
                width: "36%",
                height: "700%",
                zIndex: 1,
              }}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",

          bgcolor: "white",
          overflow: "hidden",
        }}
      >
        {/* Left Column: Social Icons + Line */}
        {/* Left Column: Social Icons + Line (hide on small screens) */}
        {!isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mr: { md: 6, lg: 6, xl: 6 },
              mt: { md: 20, lg: 20, xl: 20 },
            }}
          >
            <GoogleIcon sx={{ fontSize: 20, color: "grey.800" }} />
            <InstagramIcon sx={{ fontSize: 20, color: "grey.800" }} />
            <FacebookIcon sx={{ fontSize: 20, color: "grey.800" }} />

            <Box
              sx={{
                width: "2px",
                height: { md: 150, lg: 150, xl: 150 },
                bgcolor: "grey.400",
                mt: 2,
              }}
            />
          </Box>
        )}
        {/* Brown Block */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            bgcolor: "#B87333",
            width: { xs: "140%", md: "70%", lg: "70%", xl: "70%" },
            height: { xs: "269px", md: "500px", lg: "500px", xl: "500px" },
            display: "flex",
            flexDirection: {
              xs: "row-reverse",
              md: "row",
              lg: "row",
              xl: "row",
            },
            alignItems: "stretch",
            color: "white",
            boxShadow: 4,
            p: 4,
            gap: 4,
          }}
        >
          {/* Left: Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: { xs: "flex-start", md: "flex-start" },

              pb: 2,
            }}
          >
            <Box
              component="img"
              src={BrownImage}
              alt="Model"
              sx={{
                flex: 1,
                maxHeight: { xs: "119%", md: "110%", xl: "110%", l: "110%" },
                width: "250%",
                objectFit: "cover",
                mb: { md: -6, lg: -6, xl: -6 },
                mt: { xs: -0.2 },
                ml: { xs: 29 },
              }}
            />
          </Box>

          {/* Right: Text */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: {
                xs: "flex-start",
                md: "flex-start",
                l: "flex-start",
                xl: "flex-start",
              },

              mt: { xs: 5, md: 8, lg: 8, xl: 8 },
              mr: { xs: -10 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                whiteSpace: "nonwrap",
                fontSize: { xs: "1.4rem", md: "3rem", lg: "3rem", xl: "3rem" },
              }}
            >
              ELEVATE BEAUTY
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Shop our entire lineup of fine faves in store, get styled and join
              the Fine Crew.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                px: 4,
                py: 1.2,
                "&:hover": { bgcolor: "black", color: "white" },
              }}
              endIcon={<ArrowDownwardIcon />}
              onClick={() =>
                productsRef.current?.scrollIntoView({ behavior: "smooth" })
              } // 👈 scrolls smoothly
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Our Products Section */}
      <Box sx={{ py: { xs: 9, md: 6, lg: 6, xl: 6 } }}>
        {/* Top Text */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            textAlign: "center",
            mb: 1,
            fontSize: "1.7rem",
          }}
        >
          Quality And Exquisite
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 6,
            fontFamily: "serif",
          }}
        >
          Our Products
        </Typography>

        {/* Products Grid */}
        <Box
          ref={productsRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {/* Product 1 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box
              component="img"
              src={Earring}
              alt="Earrings"
              sx={{
                width: { xs: "89%", md: "50%", lg: "50%", xl: "50%" },
                borderRadius: "10px",
                mx: { xs: "auto", md: 0 }, // center horizontally on small screens
                display: "block", // ensures mx:auto works
              }}
            />
            <Box sx={{ flex: 1, px: { xs: 3, sm: 3, md: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Trending Earring Collection
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact, transforming any
                look from simple to stunning with a subtle sparkle.
              </Typography>
              <Typography variant="body2" sx={{ mb: 6 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#B87333",
                  color: "#B87333",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                }}
                onClick={() => navigate("products/earrings")}
              >
                Shop Now
              </Button>
            </Box>
          </Box>

          {/* Product 2 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1, px: { xs: 3, sm: 3, md: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Trending Bangle Collection
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact, transforming any
                look from simple to stunning with a subtle sparkle.
              </Typography>
              <Typography variant="body2" sx={{ mb: 6 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#B87333",
                  color: "#B87333",
                  fontWeight: "bold",

                  px: 4,
                  py: 1.2,
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                }}
                onClick={() => navigate("/products/bangles")}
              >
                Shop Now
              </Button>
            </Box>
            <Box
              component="img"
              src={Bangle}
              alt="Bangles"
              sx={{
                width: { xs: "89%", md: "50%" },
                borderRadius: "10px",
                mx: { xs: "auto", md: 0 }, // center horizontally on small screens
                display: "block",
              }}
            />
          </Box>

          {/* Product 3 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "start",
            }}
          >
            <Box
              component="img"
              src={Necklace}
              alt="Necklace"
              sx={{
                width: { xs: "89%", md: "50%" },
                borderRadius: "10px",
                mx: { xs: "auto", md: 0 }, // center horizontally on small screens
                display: "block",
              }}
            />
            <Box sx={{ flex: 1, px: { xs: 3, sm: 3, md: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                100% Gold Necklace Collection
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact, transforming any
                look from simple to stunning with a subtle sparkle.
              </Typography>
              <Typography variant="body2" sx={{ mb: 6 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#B87333",
                  color: "#B87333",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                }}
                onClick={() => navigate("products/necklaces")}
              >
                Shop Now
              </Button>
            </Box>
          </Box>

          {/* Product 2 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1, px: { xs: 3, sm: 3, md: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Trending Ring Collection
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact, transforming any
                look from simple to stunning with a subtle sparkle.
              </Typography>
              <Typography variant="body2" sx={{ mb: 6 }}>
                Add a touch of elegance and personality with the perfect pair of
                earrings—small details that make a big impact.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#B87333",
                  color: "#B87333",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                }}
                onClick={() => navigate("/products/rings")}
              >
                Shop Now
              </Button>
            </Box>
            <Box
              component="img"
              src={Ring}
              alt="Rings"
              sx={{
                width: { xs: "89%", md: "50%" },
                borderRadius: "10px",
                mx: "auto", // center horizontally on small screens
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Best Collection Section */}
      <Box ref={dealsRef} sx={{ py: 6 }}>
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            fontFamily: "serif",
          }}
        >
          Manhattan Best Collection
        </Typography>

        {/* Collection Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, sm: 3, md: 0 }, // side spacing on small screens
          }}
        >
          {/* Item 1 */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .overlay": { opacity: 1 },
              "&:hover img": { filter: "blur(4px)", transform: "scale(1.05)" },
            }}
          >
            <Box
              component="img"
              src={silver}
              alt="Silver Hoops"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.4s ease",
              }}
            />

            {/* Overlay with cart icon */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.4)",
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <IconButton
                onClick={() => console.log("Added to cart")}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                  p: 2,
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Long Earrings
            </Typography>
          </Box>

          {/* Item 2 */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .overlay": { opacity: 1 },
              "&:hover img": { filter: "blur(4px)", transform: "scale(1.05)" },
            }}
          >
            <Box
              component="img"
              src={silver1}
              alt="Silver Hoops"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.4s ease",
              }}
            />
            {/* Overlay with cart icon */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.4)",
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <IconButton
                onClick={() => console.log("Added to cart")}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                  p: 2,
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Twin Necklace and Earring
            </Typography>
          </Box>

          {/* Item 3 */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .overlay": { opacity: 1 },
              "&:hover img": { filter: "blur(4px)", transform: "scale(1.05)" },
            }}
          >
            <Box
              component="img"
              src={silver2}
              alt="Silver Hoops"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.4s ease",
              }}
            />

            {/* Overlay with cart icon */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.4)",
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <IconButton
                onClick={() => console.log("Added to cart")}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                  p: 2,
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              African Bangle
            </Typography>
          </Box>

          {/* Item 4 */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .overlay": { opacity: 1 },
              "&:hover img": { filter: "blur(4px)", transform: "scale(1.05)" },
            }}
          >
            <Box
              component="img"
              src={silver3}
              alt="Silver Hoops"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.4s ease",
              }}
            />

            {/* Overlay with cart icon */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.4)",
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <IconButton
                onClick={() => console.log("Added to cart")}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#B87333", color: "white" },
                  p: 2,
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Ring Set
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Brown Card Section */}
      <Box
        ref={aboutRef}
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, md: 0 },
        }}
      >
        <Card
          sx={{
            bgcolor: "#B87333",
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 6,
          }}
        >
          {/* Left: Image */}
          <Box
            component="img"
            src={dp} // replace with any other image if needed
            alt="Jewelry"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: 250, md: "100%" },
              objectFit: "cover",
            }}
          />

          {/* Right: Text */}
          <Box
            sx={{
              flex: 1,
              color: "white",
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, fontFamily: "serif" }}
            >
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We love Landingfolio! Our designers were using it for their
              projects, as clients already knew what Landingfolio was and how to
              use it. We love Landingfolio! Our designers were using it for
              their projects, as clients already knew what Landingfolio was and
              how to use it. We love Landingfolio! Our designers were using it
              for their projects, as clients already knew what Landingfolio was
              and how to use it.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#B87333",
                fontWeight: "bold",
                borderRadius: 2,
                px: 4,
                py: 1.2,
                alignSelf: "flex-start",
                "&:hover": { bgcolor: "black", color: "white" },
              }}
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/contactUs")}
            >
              Contact Us
            </Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{ bgcolor: "#B87333", pt: 6, pb: 2 }}>
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            px: { xs: 3, md: 10 },
            pb: 4,
          }}
        >
          {/* Column 1: Brand */}
          <Box sx={{ mb: { xs: 4, md: 0 }, maxWidth: 300 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Manhattan
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Shop our entire lineup all in one week in store, get styled and
              join the Fine Crew.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "white" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Column 2: Resources */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/" underline="none" color="inherit">
                Jewelry Care
              </Link>
              <Link href="/" underline="none" color="inherit">
                Ring Sizer
              </Link>
              <Link href="/" underline="none" color="inherit">
                Pricing Aftercare
              </Link>
              <Link href="/" underline="none" color="inherit">
                Style Edit
              </Link>
            </Box>
          </Box>

          {/* Column 3: Stores & Services */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Stores & Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/" underline="none" color="inherit">
                Stores
              </Link>
              <Link href="/" underline="none" color="inherit">
                Pricing Studio
              </Link>
              <Link href="/" underline="none" color="inherit">
                Styling Appointments
              </Link>
            </Box>
          </Box>

          {/* Column 4: Help */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Help
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/" underline="none" color="inherit">
                Shipping
              </Link>
              <Link href="/" underline="none" color="inherit">
                Returns + Exchange
              </Link>
              <Link href="/" underline="none" color="inherit">
                Warranty
              </Link>
              <Link href="/" underline="none" color="inherit">
                All FAQ
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{ borderTop: "1px solid black", mx: { xs: 3, md: 10 }, pt: 2 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "black", mt: 2 }}
          >
            ©2026 Manhattan. All rights reserved
          </Typography>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
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
          <Button sx={{color:"#B87333"}}onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
