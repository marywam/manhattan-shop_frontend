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
  TextField,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import ringImage from "../assets/ring.png";

const ShoppingCartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Earring", price: 1600, quantity: 1, image: ringImage },
    { id: 2, name: "Earring", price: 1600, quantity: 1, image: ringImage },
  ]);

  const [orderNote, setOrderNote] = useState("");

  const handleQuantityChange = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="relative" elevation={0} sx={{
        bgcolor: isSmallScreen ? "black" : "white",
        color: isSmallScreen ? "white" : "black"
      }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{
            fontWeight: "bold", color: "#B87333", fontFamily: "serif", flexGrow: 1
          }}>Manhattan</Typography>
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

      {/* Shopping Cart Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: "medium", mb: 6 }}>
            SHOPPING CART
          </Typography>

          <TableContainer component={Paper} sx={{
            width: "100%", overflowX: "auto", mb: 4,
            boxShadow: "none", border: "1px solid #e0e0e0"
          }}>
            <Table sx={{ minWidth: isSmallScreen ? 0 : 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", pl: 2 }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", pr: 2 }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ pl: 2 }}>
                      <Box sx={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        alignItems: isSmallScreen ? "flex-start" : "center",
                        gap: 1
                      }}>
                        <Box component="img" src={item.image} alt={item.name} sx={{
                          width: isSmallScreen ? 80 : isMediumScreen ? 120 : 140,
                          height: isSmallScreen ? 80 : isMediumScreen ? 120 : 140,
                          objectFit: "cover", borderRadius: 1
                        }} />
                        <Box>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ksh {item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IconButton onClick={() => handleQuantityChange(item.id, -1)}
                          size="small" sx={{ border: "1px solid #e0e0e0", borderRadius: 0, p: 0.5 }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, minWidth: 20, textAlign: "center" }}>{item.quantity}</Typography>
                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}
                          size="small" sx={{ border: "1px solid #e0e0e0", borderRadius: 0, p: 0.5 }}>
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

          <Divider sx={{ mb: 4 }} />

          {/* Order Note & Summary */}
          <Grid container spacing={3} direction={isSmallScreen ? "column" : "row"}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2 }}>Add Order Note</Typography>
              <TextField
                fullWidth multiline rows={4} placeholder="How can we help you?" variant="outlined"
                value={orderNote} onChange={(e) => setOrderNote(e.target.value)}
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
                <Button variant="contained" fullWidth sx={{
                  bgcolor: "#B87333", color: "white", py: 1.5,
                  "&:hover": { bgcolor: "#a56a2d" }
                }}>
                  CHECK OUT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ShoppingCartPage;
