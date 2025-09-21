import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Login";
import SignUpPage from "./Buyer/Register";
import HomePage from "./Buyer/Home";
import EarringsPage from "./Buyer/EarringShop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>
        <Route path="/earrings" element={<EarringsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
