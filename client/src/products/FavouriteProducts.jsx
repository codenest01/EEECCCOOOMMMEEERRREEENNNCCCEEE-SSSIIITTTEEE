import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Swal from 'sweetalert2';

function FavouriteProducts() {
  const { getFavProd, addtocart, removeFav } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavProd(); // Assuming this returns an object with 'data.items'
        setFavorites(response.data.items); // Set the fetched favorites to state
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavorites(); // Fetch favorites only once when the component mounts
  }, []); // Empty dependency array to run once on mount

  // Handler to remove a favorite product
  const handleremoveFav = async (productId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await removeFav(productId); // Await the removeFav function

                if (response && response.success) {  // Check if success is true
                    setFavorites((prevFavorites) =>
                        prevFavorites.filter((product) => product.productId !== productId)
                    );
                    Swal.fire("Deleted!", "Your item has been deleted.", "success");
                } else {
                    Swal.fire("Error!", "Could not remove item from favorites.", "error");
                }
            } catch (error) {
                Swal.fire("Error!", error.message || "Could not remove item from favorites.", "error");
            }
        }
    });
};


  
  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Favorite Products</h2>
      <div className="product-card-container">
        <div className="row">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <div key={product.productId} className="col-md-3 col-sm-4 mb-4">
                <div className="card h-100 d-flex flex-column product-card">
                  <Link to={`/product/${product.productId}`}>
                    <img
                      src={product.imageSrc}
                      className="card-img-top product-card-img-top"
                      alt={product.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </Link>

                  <div className="text-center mt-2">
                    <span style={{ color: "blue", fontWeight: "bold", fontSize: "1.9rem" }}>
                      ${product.price}
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h5 className="card-title">{product.title}</h5>

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
                        }}
                        onClick={() =>
                          addtocart(
                            product.productId,
                            product.title,
                            product.price,
                            1,
                            product.imageSrc
                          )
                        }
                      >
                        <AiOutlineShoppingCart style={{ marginRight: "8px" }} />
                        Add to Cart
                      </button>
                      <span
                        style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                        onClick={() => handleremoveFav(product.productId)}
                      >
                        remove
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorite products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouriteProducts;
