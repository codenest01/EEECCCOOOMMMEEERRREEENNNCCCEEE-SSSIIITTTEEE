import { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../src/App.css"
import Header from "./Layout/Header";
import ShowProduct from "./products/ShowProduct";
import ProductDetail from "./products/ProductDetail";
import Preloader from "./components/Preloader";
import Sidebar from "./Layout/Sidebar";
import AppContext from "./context/AppContext";
import SearchProduct from "./components/SearchProduct";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login"
import Cart from "./components/Cart"
import Profile from "./components/user/Profile"
import Address from "./components/Address"
import Checkout from "./components/Checkout";
import FavouriteProducts from "./products/FavouriteProducts"


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<ShowProduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile   />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Address />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favproducts" element={<FavouriteProducts />} />
            <Route path="/product/search/:term" element={<SearchProduct />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
