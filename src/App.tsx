import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/nav/Nav";
import Home from "./components/home/Home";
import LoginForm from "./components/login/Login";
import RegisterForm from "./components/login/Register";
import Cart from "./components/cart/Cart";
import FullWidthGrid from "./components/pruebas/Test";
import CreateProduct from "./components/createProduct/CreateProduct";
import ProductDetails from "./components/moreDetails/MoreDetails";
import ContactForm from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import Logout from "./components/logout/logout";
import { PaginationProvider } from "./components/hooks/provaider";

function App() {
  return (
    <Router>
      <PaginationProvider>
        <ResponsiveAppBar />

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<FullWidthGrid />} />
          <Route path="/moreDetails/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm></ContactForm>} />
        </Routes>
      </PaginationProvider>
    </Router>
  );
}

export default App;
