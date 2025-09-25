import React, { useState, useEffect} from 'react';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios"; // ✅ make sure axios is imported



const API_URL = process.env.REACT_APP_API_URL;

function Checkout() {
  const location = useLocation();
  const { cartItems = [] } = location.state || {};
    const navigate = useNavigate();
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

   

    
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('pickup');

  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    county: "Kenya",
    city: "",
    address: "",
    apartment: "",
    postal_code: "",
    phone: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [username, setUsername] = useState("");

  // ✅ Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_URL}/addresses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data);
        if (res.data.length > 0) {
          // 👉 Auto-fill the form with the first saved address
          setAddressForm(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err.response?.data || err.message);
      }
    };
  
    fetchAddresses();
  }, []);
  

  // ✅ Handle address form input
  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  // ✅ Submit address
  // ✅ Submit address
const handleSaveAddress = async () => {
  if (
    !addressForm.first_name ||
    !addressForm.last_name ||
    !addressForm.contact ||
    !addressForm.city ||
    !addressForm.address ||
    !addressForm.postal_code ||
    !addressForm.phone
  ) {
    alert("Please fill in all required fields before proceeding.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // 👉 If this address already exists in `addresses`, just reuse it (no backend call)
    const alreadySaved = addresses.some(
      (addr) =>
        addr.first_name === addressForm.first_name &&
        addr.last_name === addressForm.last_name &&
        addr.contact === addressForm.contact &&
        addr.city === addressForm.city &&
        addr.address === addressForm.address &&
        addr.postal_code === addressForm.postal_code &&
        addr.phone === addressForm.phone
    );

    if (alreadySaved) {
      console.log("Reusing saved address:", addressForm);
      navigate("/payment", { state: { subtotal, address: addressForm } });
      return;
    }

    // 👉 Otherwise, save a new address
    const res = await axios.post(`${API_URL}/addresses/`, addressForm, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Saved address:", res.data);

    // ✅ Redirect after successful save
    navigate("/payment", { state: { subtotal, address: res.data } });
  } catch (error) {
    console.error("Save address error:", error.response?.data || error.message);
    alert(
      "Failed to save address: " +
        (error.response?.data?.detail || error.message)
    );
  }
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
         const storedUser = localStorage.getItem("username");
         if (storedUser) setUsername(storedUser);
       }, []);
  
  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Navbar */}
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


      {/* Back Button */}
    <Box sx={{ px: 2, py: 2 }}>
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
      
      {/* Checkout Content */}
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4}>
          {/* Left side - Checkout Form */}
          <Grid item xs={12} md={7}>
            {/* Contact Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">Contact</Typography>
               
              </Box>
              <TextField
                fullWidth
                placeholder="Email or Phone Number"
                variant="outlined"
                name="contact"
                size="small"
                value={addressForm.contact}
                onChange={handleAddressChange}
                sx={{ mb: 2 }}
              />
            </Box>
            
            {/* Delivery Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                Delivery
              </Typography>
              <TextField
  select
  fullWidth
  name="county"
  value={addressForm.county}
  onChange={handleAddressChange}
  variant="outlined"
  size="small"
  sx={{ mb: 2 }}
>
  <MenuItem value="Kenya">Kenya</MenuItem>
</TextField>

              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="first_name"
                    placeholder="First Name"
                    variant="outlined"
                    size="small"
                    value={addressForm.first_name}
              onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="last_name"
                    placeholder="Last Name"
                    variant="outlined"
                    size="small"
                    value={addressForm.last_name}
                    onChange={handleAddressChange}
                  />
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                placeholder="ADDRESS"
                variant="outlined"
                name="address"
                size="small"
                value={addressForm.address}
                onChange={handleAddressChange}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                placeholder="APARTMENT"
                variant="outlined"
                name="apartment"
                value={addressForm.apartment}
                onChange={handleAddressChange}
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="CITY"
                    variant="outlined"
                    size="small"
                    name="city"
                    value={addressForm.city}
              onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="POSTAL CODE"
                    variant="outlined"
                    name="postal_code"
                    size="small"
                    value={addressForm.postal_code}
              onChange={handleAddressChange}
                  />
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                placeholder="PHONE"
                variant="outlined"
                size="small"
                name="phone"
                sx={{ mb: 2 }}
                value={addressForm.phone}
                onChange={handleAddressChange}
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{ 
                      color: 'text.secondary',
                      '&.Mui-checked': { color: 'text.primary' }
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    Save This Information For Later
                  </Typography>
                }
              />
            </Box>
            
            {/* Shipping Method */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
                Shipping Method
              </Typography>
              
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: selectedShippingMethod === 'pickup' ? 'warning.main' : 'divider',
                  borderRadius: 1,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedShippingMethod('pickup')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RadioButtonCheckedIcon 
                    sx={{ 
                      color: 'warning.main',
                      fontSize: 20,
                      mr: 1
                    }} 
                  />
                  <Typography>Pickup point: Nairobi Town</Typography>
                </Box>
                <Typography fontWeight="bold">FREE</Typography>
              </Box>
            </Box>
            
            {/* Payment Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                Payment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                All Transactions Are Secure And Encrypted
              </Typography>
              
              <Box 
                sx={{ 
                  border: '1px solid #ccc', 
                  borderRadius: 1, 
                  p: 2, 
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography>MPESA</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  
                  <Box 
                    component="img" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/2560px-M-PESA_LOGO-01.svg.png" 
                    alt="M-Pesa"
                    sx={{ height: 40 }}
                  />
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  bgcolor: '#f5f5f5', 
                  p: 3, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}
              >
                <Box 
                  sx={{ 
                    border: '1px solid #ccc', 
                    p: 4, 
                    width: '60%', 
                    mx: 'auto', 
                    bgcolor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box></Box>
                  <Box component="span" sx={{ fontSize: 20 }}>→</Box>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                After Clicking "Pay Now", You Will Be Redirected To MPESA To Complete Your Purchase Securely
              </Typography>

               <Button variant="contained" fullWidth sx={{
                                bgcolor: "#B87333", color: "white",mt: 4, py: 1.5,
                                "&:hover": { bgcolor: "#a56a2d" }
                              }}
                              onClick={handleSaveAddress}
                              >
                                PAY NOW
                              </Button>
            </Box>
          </Grid>
          
          {/* Right side - Order Summary */}
          <Grid item xs={12} md={5} >
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
              {/* Product */}
             {/* Products Summary */}
{cartItems.map((item) => (
  <Box key={item.id} sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
    <Box
      sx={{
        width: 80,
        height: 80,
        bgcolor: '#f0f0f0',
        borderRadius: 1,
        position: 'relative',
        mr: 2,
        overflow: 'hidden'
      }}
    >
      <img 
        src={item.image} 
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box 
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          bgcolor: '#000',
          color: '#fff',
          width: 18,
          height: 18,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12
        }}
      >
        {item.quantity}
      </Box>
    </Box>
    <Box>
      <Typography variant="subtitle2">{item.name}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        KSh {(item.price * item.quantity).toLocaleString()}
      </Typography>
    </Box>
  </Box>
))}

              
              {/* Discount Code */}
              <Box sx={{ display: 'flex', mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Discount Code"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#e0e0e0', 
                    color: 'black',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#d0d0d0',
                      boxShadow: 'none',
                    }
                  }}
                >
                  Apply
                </Button>
              </Box>
              
              {/* Summary */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">KSh {subtotal.toLocaleString()}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">FREE</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">Total</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
    KSh {subtotal.toLocaleString()}
  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

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

export default Checkout;