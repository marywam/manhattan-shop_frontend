import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  MenuItem,
  Select,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";   

import Earring from "../assets/earring.png";

export default function EarringsPage() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const navLinks = ["Category", "About", "Shop", "Contact"];

  // Dummy product data (9 items)
  const products = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    name: "The Perfect Hoop",
    price: "Ksh 2000",
    image: Earring,
    badge: i % 2 === 0 ? "Best Seller" : null,
  }));

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
          {isSmallScreen && (
            <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Drawer for mobile */}
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
                <ListItem button key={text} onClick={() => setOpen(false)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
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
                onClick={() => {
                  setOpen(false);
                  console.log("Logged out");
                }}
              >
                Logout
              </Button>
            </Box>
          </Drawer>

          {/* Logo */}
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

          {!isSmallScreen && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((link) => (
                <Button key={link} color="inherit">
                  {link}
                </Button>
              ))}
            </Box>
          )}

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

      {/* Page Header */}
      <Box sx={{ textAlign: "center", py: 6, px: 2, maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, letterSpacing: 1 }}
        >
          MANHATTAN EARRINGS
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Add a touch of elegance and personality with the perfect pair of
          earrings—small details that make a big impact, transforming any look
          from simple to stunning with a subtle sparkle.
        </Typography>
      </Box>

      {/* Filters Row */}
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
        {["Collection", "Color", "Size", "Price"].map((label) => (
          <Select
            key={label}
            defaultValue=""
            displayEmpty
            sx={{
              minWidth: 150,
              borderRadius: 2,
              bgcolor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
            }}
          >
            <MenuItem value="">{label}</MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        ))}
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // ✅ 2 per row on small screens
            md: "repeat(3, 1fr)", // ✅ 3 per row on medium & large screens
          },
          gap: 3,
          maxWidth: "1000px",
          mx: "auto",
          pb: 6,
          px: { xs: 2, md: 0 }, // ✅ side padding only on small screens
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ textAlign: "center" }}>
            {/* Image Card with hover */}
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                overflow: "hidden",
                position: "relative",
                "&:hover .product-image": {
                  transform: "scale(1.1)",
                  filter: "blur(2px)",
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={product.image}
                  alt={product.name}
                  className="product-image"
                  sx={{
                    transition: "all 0.4s ease",
                    height: { xs: 220, sm: 260, md: 350 }, // ✅ smaller on small screens, 350px on large
                    objectFit: "cover",
                    mx: "auto", // ✅ center image in card
                  }}
                />
                {product.badge && (
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
                    }}
                  >
                    {product.badge}
                  </Box>
                )}
                {/* Overlay with cart icon */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      console.log(`${product.name} added to cart`)
                    }
                    sx={{
                      bgcolor: "white",
                      "&:hover": { bgcolor: "#B87333", color: "white" },
                    }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>

            {/* Text outside the card */}
            <Typography variant="subtitle1" sx={{ fontWeight: "500", mt: 1 }}>
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", mt: 0.5, color: "black" }}
            >
              {product.price}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
