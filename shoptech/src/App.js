import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Login";
import SignUpPage from "./Buyer/Register";
import HomePage from "./Buyer/Home";
import EarringsPage from "./Buyer/EarringShop";
import BanglesPage from "./Buyer/BangleShop";
import NecklacesPage from "./Buyer/NecklaceShop";
import RingsPage from "./Buyer/RingShop";
import ContactUsPage from "./Buyer/Contact";
import ProductDetailPage from "./Buyer/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>
        <Route path="/earrings" element={<EarringsPage />}/>
        <Route path="/bangles" element={<BanglesPage />} />
        <Route path="/necklaces" element={<NecklacesPage/>}/>
        <Route path="/rings" element={<RingsPage/>}/>
        <Route path="/contactUs" element={<ContactUsPage/>}/>
        <Route path="/productDetail" element={<ProductDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
