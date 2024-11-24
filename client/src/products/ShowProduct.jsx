import React, { useContext, useEffect, useState } from "react";
import "../styles/ProductCard.css"; 
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { AiOutlineEye,AiOutlineHeart} from "react-icons/ai";
import { AiOutlineShoppingCart } from 'react-icons/ai';
function ShowProduct() {
  const { filteredData, addtocart, setFilteredData, products,addToFavorites} =
    useContext(AppContext);

  // State for category filter, price filter, and min/max price
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const minPrice = 0; // Minimum price range
  const maxPrice = 1000; // Maximum price range
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Handle category filter change
  const handleCategoryChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Handle price range change
  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setSelectedPriceRange((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  // Filter products by category and price range
  const filterProducts = () => {
    const filteredByCategory =
      selectedFilter === "all"
        ? products
        : products.filter(
            (product) =>
              product.category.toLowerCase() === selectedFilter.toLowerCase()
          );

    const filteredByPrice = filteredByCategory.filter(
      (product) =>
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max
    );

    setFilteredData(filteredByPrice);
  };

  // Function to filter products based on the category
  const filterByCategory = (cat) => {
    window.location.hash = cat; // Update the hash in the URL
    setSelectedFilter(cat); // Set the selected category
  };

  const checkCategoryFromHash = () => {
    const category = window.location.hash.replace("#", ""); // Get category from the URL hash
    if (category) {
      filterByCategory(category);
    }
  };

  // Open the dialog and set the selected product
  const handleQuickViewOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Close the dialog
  const handleQuickViewClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  useEffect(() => {
    // Check category from the hash when the component mounts
    checkCategoryFromHash();

    // Optional: Add event listener to handle changes in hash
    window.addEventListener("hashchange", checkCategoryFromHash);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", checkCategoryFromHash);
    };
  }, []);

  // Run the filter function every time the selectedFilter or selectedPriceRange changes
  useEffect(() => {
    filterProducts();
  }, [selectedFilter, selectedPriceRange]);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  const wordLimit = 10;

  return (
    <div style={{ marginTop: "92px" }} className="bg-light">
      <div className="row">
        {/* Left Column (col-4) */}
        <div className="col-md-2 bg-blue">
          <h4 className="ms-3">Category Filter</h4>
          <ul className="list-group mt-4">
            {/* Filter Category Buttons */}
            <li
              className="list-group-item border-0"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id="all"
                  checked={selectedFilter === "all"}
                  onChange={handleCategoryChange}
                  onClick={() => filterByCategory("all")}
                />
                <label className="form-check-label" htmlFor="all">
                  All
                </label>
              </div>
            </li>

            {/* Add other categories here as in the original code */}
            {/* Example Category: */}
            <li
              className="list-group-item border-0"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id="Fashion"
                  checked={selectedFilter === "Fashion"}
                  onChange={handleCategoryChange}
                  onClick={() => filterByCategory("Fashion")}
                />
                <label className="form-check-label" htmlFor="Fashion">
                  Fashion
                </label>
              </div>
            </li>
            {/* Add more categories */}
          </ul>

          {/* Price Range Filters */}
          <div className="price-range mt-4">
            <h5 className="ms-3">Price Range</h5>
            <label className="ms-3">Min Price</label>
            <input
              type="number"
              name="min"
              value={selectedPriceRange.min}
              min={minPrice}
              max={maxPrice}
              onChange={handlePriceRangeChange}
            />
            <label className="ms-3 mt-2">Max Price</label>
            <input
              type="number"
              name="max"
              value={selectedPriceRange.max}
              min={minPrice}
              max={maxPrice}
              onChange={handlePriceRangeChange}
            />
            <p className="text-center mt-2">
              ${selectedPriceRange.min} - ${selectedPriceRange.max}
            </p>
          </div>
        </div>

        {/* Right Column (col-8) with Products */}
        <div className="col-md-10">
          <div className="product-card-container">
            <div className="row">
              {filteredData?.map((product) => (
                <div key={product._id} className="col-md-3 col-sm-4 mb-4">
                  <div className="card h-100 d-flex flex-column product-card">
                    <div>
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.imageSrc}
                          className="card-img-top product-card-img-top"
                          alt={product.title}
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </Link>

                      <div className="text-center mt-2">
                        <span
                          style={{
                            color: "blue",
                            fontWeight: "bold",
                            fontSize: "1.9rem",
                            padding: "0.375rem 0.75rem",
                            borderRadius: "5px",
                            display: "inline-block",
                          }}
                        >
                          {product.price} {"$"}
                        </span>
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between product-card-body text-center">
                      <div>
                        <h5 className="card-title product-card-title">
                          {product.title}
                        </h5>
                        <p className="card-text product-card-text">
                          {truncateDescription(product.description, wordLimit)}
                        </p>
                      </div>
                    
<br />
                      <div className="">
                        <span>
                          <AiOutlineEye
                            style={{
                              fontSize:"1.4em",
                              color: "blue",
                              fontWeight: "bold",
                              cursor: "pointer", 
                              
                            }}
                            onClick={() => handleQuickViewOpen(product)}
                          />
                        </span>
                        <AiOutlineHeart
                          style={{
                            fontSize:"1.4em",
                            color: "blue",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginLeft:"12px"
                          }}
                          onClick={() =>
                            addToFavorites(
                              product._id,
                              product.title,
                              product.price,
                              
                              product.imageSrc
                            )
                          }
                        
                        />
            
                      </div>

                      <div className="d-flex justify-content-center mt-auto">
                      
                        <button
                          className="btn product-card-btn"
                          style={{
                            border: "2px solid black",
                            color: "blue",
                            fontWeight: "bold",
                            padding: "0.375rem 0.75rem",
                            borderRadius: "2%",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                            display: "inline-block",
                          }}
                          onClick={() =>
                            addtocart(
                              product._id,
                              product.title,
                              product.price,
                              1,
                              product.imageSrc
                            )
                          }
                        >
                          <AiOutlineShoppingCart style={{ marginRight: "8px" }} />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick View Dialog */}
            <Dialog
              open={open}
              onClose={handleQuickViewClose}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>{selectedProduct?.title}</DialogTitle>
              <DialogContent>
                {selectedProduct && (
                  <div className="text-center">
                    <img
                      src={selectedProduct.imageSrc}
                      alt={selectedProduct.title}
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                        marginBottom: "1rem",
                      }}
                    />
                    <h5>Price: ${selectedProduct.price}</h5>
                    <p>{selectedProduct.description}</p>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleQuickViewClose} color="primary">
                  Close
                </Button>
                <Button
                  style={{
                    backgroundColor: "#007bff", // A bright blue color for a modern look
                    color: "#fff", // White text for contrast
                    fontSize: "0.9rem", // Adjusted font size
                    padding: "", // Adds padding for a more substantial feel
                    borderRadius: "8px", // Rounded corners for a softer look
                    border: "none", // Removes border for a sleeker style
                    fontWeight: "600", // Slightly bolded text for emphasis
                    cursor: "pointer", // Pointer cursor to indicate it's clickable
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                  }}
                  onClick={() => {
                    addtocart(
                      selectedProduct._id,
                      selectedProduct.title,
                      selectedProduct.price,
                      1,
                      selectedProduct.imageSrc
                    );
                    handleQuickViewClose();
                  }}
                >
                  Add to Cart
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
