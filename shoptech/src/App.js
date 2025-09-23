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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>
        <Route path="/contactUs" element={<ContactUsPage/>}/>
        <Route path="/productDetail" element={<ProductDetailPage/>}/>
        <Route path="/cart" element={<ShoppingCartPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/products/:group" element={<ProductsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
