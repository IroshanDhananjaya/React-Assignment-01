import React from "react";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="user" element={<User />} />
      <Route path="product" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="homepage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
