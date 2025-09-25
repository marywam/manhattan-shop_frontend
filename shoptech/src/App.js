import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Login";
import SignUpPage from "./Buyer/Register";
import HomePage from "./Buyer/Home";
import ContactUsPage from "./Buyer/Contact";
import ProductDetailPage from "./Buyer/ProductDetail";
import ShoppingCartPage from "./Buyer/Shopping Cart";
import Checkout from "./Buyer/Checkout";
import ProductsPage from "./Buyer/ProductPage";
import BuyerProfilePage from "./Buyer/BuyerProfilePage";
import BuyerOrdersPage from "./Buyer/OrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>
        <Route path="/contactUs" element={<ContactUsPage/>}/>
        <Route path="/product/:code" element={<ProductDetailPage />} />
        <Route path="/cart" element={<ShoppingCartPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/products/:group" element={<ProductsPage />} />
        <Route path="/profile" element={<BuyerProfilePage/>}/>
        <Route path="/orders" element={<BuyerOrdersPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
