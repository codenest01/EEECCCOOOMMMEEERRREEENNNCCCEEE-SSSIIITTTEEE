import React, { useState, useEffect, useContext } from "react";
import "../styles/Header.css";
import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Sidebar from "../layout/Sidebar"; // Import the TestHeader component
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Header() {
  const {
    isAuthenticated,
    filteredData,
    setFilteredData,
    products,
    logout,
    cart,
    favorites,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // State to manage visibility
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  // Effect to toggle visibility based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsHeaderVisible(window.innerWidth >= 992); // 992px is Bootstrap's lg breakpoint
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Check on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const filterByCategory = (cat) => {
    setFilteredData(
      cat === "all"
        ? products
        : products.filter(
            (data) => data.category.toLowerCase() === cat.toLowerCase()
          )
    );
  };

  return (
    <>
      {isHeaderVisible ? (
        <div
          className="navbar w-100 d-flex align-items-center justify-content-between d-none d-lg-flex flex-nowrap position-fixed"
          style={{
            height: "92px",
            top: "0",
            left: "0",
            right: "0",
            zIndex: 1050,
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <img
              style={{ width: "auto", height: "50px" }}
              className="ms-5"
              src="data:image/jpeg;base64,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"
              alt=""
              onClick={() => filterByCategory("all")}
            />
          </Link>

          {/* Navigation Menu */}
          <nav className="flex-grow-1" style={{ marginLeft: "20px" }}>
            <ul className="d-flex align-items-center justify-content-center m-0 list-unstyled flex-nowrap">
              <li className="px-3 px-lg-4">Services</li>
              <li className="px-3 px-lg-4">About</li>
              <li className="px-3 px-lg-4">Products</li>
              <li className="px-3 px-lg-4">Blog</li>
            </ul>
          </nav>

          {/* Search Bar */}
          <form
            className="searchBar d-flex d-md-block d-lg-flex me-5"
            onSubmit={submitHandler}
          >
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="searchBarInput"
              placeholder="Type to search..."
            />

            <button type="submit" className="searchBarButton">
              <CiSearch />
            </button>
          </form>

          {isAuthenticated ? (
            <>
              <div className=" d-flex align-items-center flex-nowrap">
                {/* Cart Icon */}
                <a href="/cart" className="position-relative">
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                  >
                    {cart?.items?.length || 0}
                  </span>
                  <BsCart4
                    size={30}
                    color="#000"
                   
                  />
                </a>
              </div>

              <a href="/favproducts" className="position-relative mx-3">
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                >
                  {favorites?.length || 0}
                  {/* This will show 0 if there are no favorites */}
                </span>
                <MdFavoriteBorder size={25} color="#000" />
              </a>

              {/* Profile Icon */}
              <Link to="/profile">
                <RiAccountCircleLine size={25} color="#000" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="btn btn-link text-decoration-none ms-3"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="fs-3 d-flex align-items-center mx-5 flex-nowrap">
              <div className="d-flex align-items-center me-4">
                <a
                  href="/login"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  <span className="me-2" style={{ fontSize: "14px" }}>
                    Sign In {">"}
                  </span>
                  <RiAccountCircleLine
                    className="icon-spacing"
                    style={{ fontSize: "1.5rem" }}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Sidebar />
      )}
    </>
  );
}

export default Header;
