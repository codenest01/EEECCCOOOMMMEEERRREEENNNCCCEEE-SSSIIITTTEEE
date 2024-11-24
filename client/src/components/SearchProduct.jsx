import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import "../styles/ProductCard.css";

const SearchProduct = () => {
    const { products, addtocart } = useContext(AppContext);
    const [searchProduct, setSearchProduct] = useState([]);
    const { term } = useParams();

    useEffect(() => {
        if (term) {
            setSearchProduct(products.filter((data) => data.title.toLowerCase().includes(term.toLowerCase())));
        }
    }, [term, products]);

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
    };

    const wordLimit = 20;

    return (
        <div className="container text-center mt-5">
            <h1>Related Products</h1>
            <div className="container mt-5">
                <div className="row">
                    {searchProduct.length > 0 ? (
                        searchProduct.map((product) => (
                            <div key={product._id} className="col-md-4 mb-4">
                                <div className="card h-100 d-flex flex-column product-card">
                                    <div>
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                src={product.imageSrc}
                                                className="card-img-top product-card-img-top"
                                                alt={product.title}
                                                style={{ height: '200px', objectFit: 'contain' }}
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
                                            <h5 className="card-title product-card-title">{product.title}</h5>
                                            <p className="card-text product-card-text">
                                                {truncateDescription(product.description, wordLimit)}
                                            </p>
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
                                                onClick={() => addtocart(product._id, product.title, product.price, 1, product.imageSrc)}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found matching "{term}".</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
