import React, { useState } from 'react';

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
  InputAdornment
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('pickup');
  
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
                <Typography variant="body2" color="primary">Login</Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="Email or Phone Number"
                variant="outlined"
                size="small"
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
                defaultValue="kenya"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              >
                <MenuItem value="kenya">Kenya</MenuItem>
                <MenuItem value="uganda">Uganda</MenuItem>
                <MenuItem value="tanzania">Tanzania</MenuItem>
              </TextField>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="First Name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                placeholder="ADDRESS"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                placeholder="APARTMENT"
                variant="outlined"
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
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="POSTAL CODE"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                placeholder="PHONE"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
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
                              }}>
                                PAY NOW
                              </Button>
            </Box>
          </Grid>
          
          {/* Right side - Order Summary */}
          <Grid item xs={12} md={5} >
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
              {/* Product */}
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
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
                    src="https://via.placeholder.com/80" 
                    alt="Small Loops"
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
                    1
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Small Loops</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    KSh 1,500
                  </Typography>
                </Box>
              </Box>
              
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
                  <Typography variant="body2">KSh 1,500.00</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">FREE</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">Total</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    KSh 1,500.00
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Checkout;