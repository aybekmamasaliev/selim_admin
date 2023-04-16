import React from "react";
import { Route, Routes } from "react-router-dom";
import MainInfoTwo from "../components/MainInfo2/MainInfoTwo";
import Advantages from "../components/Advantages/Advantages";
import Services from "../components/Services/Services";
import News from "../components/News/News";
import Reviews from "../components/Reviews/Reviews";
import Categories from "../components/Categories/Cetegories";
import Products from "../components/Products/Products";
import AdminUsers from "../components/AdminUsers/AdminUsers";
import Feedback from "../components/FeedBack/FeedBack";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainInfoTwo />} />
      <Route path="/advantages" element={<Advantages />} />
      <Route path="/services" element={<Services />} />
      <Route path="/news" element={<News />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/main_info" element={<MainInfoTwo />} />
      <Route path="/products" element={<Products />} />
      <Route path="/admin_users" element={<AdminUsers />} />
    </Routes>
  );
}

export default DashboardRoutes;
