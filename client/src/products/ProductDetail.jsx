import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Styles from '../styles/ProductDetail.module.css';
import RelatedProduct from './RelatedProduct';
import AppContext from '../../src/context/AppContext';
import { toast } from 'react-toastify';

function ProductDetail() {
    const { addtocart, user } = useContext(AppContext);
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2; // Show 2 reviews at a time
    const { id } = useParams();
    const url = 'http://localhost:5000/api/v1';

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                // Fetch product details
                const productResponse = await axios.get(`${url}/get-products-by-id/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                setProduct(productResponse.data.product);

                // Fetch reviews for the product
                const reviewsResponse = await axios.get(`${url}/get-reviews/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                setReviews(reviewsResponse.data.reviews || []);
            } catch (error) {
                console.error("Error fetching product or reviews:", error);
                toast.error("Failed to fetch product details or reviews", { position: "top-right", autoClose: 3000 });
            }
        };

        fetchProductAndReviews();
    }, [id]);

    const renderStars = (rating) => {
        const filledStars = Math.round(rating);
        const emptyStars = 5 - filledStars;
        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<span key={`filled-${i}`} style={{ color: '#ffc107' }}>&#9733;</span>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} style={{ color: '#e4e5e9' }}>&#9734;</span>);
        }

        return stars;
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (rating < 1 || rating > 5) {
            toast.error("Rating must be between 1 and 5", { position: "top-right", autoClose: 3000 });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${url}/add-review/${id}`,
                { review: reviewText, rating },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                toast.success("Review added successfully!", { position: "top-right", autoClose: 3000 });
                setReviews([...reviews, response.data.review]); // Update reviews state
                setProduct({
                    ...product,
                    averageRating: response.data.product.averageRating,
                }); // Update average rating
                setReviewText('');
                setRating(0);
            } else {
                toast.error(response.data.msg || "Failed to add review", { position: "top-right", autoClose: 3000 });
            }
        } catch (err) {
            console.error("Error adding review:", err);
            toast.error(err.response?.data?.msg || "Error adding review", { position: "top-right", autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Function to load more reviews
    const loadMoreReviews = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    // Slice the reviews based on the current page
    const currentReviews = reviews.slice(0, currentPage * reviewsPerPage);

    return (
        <div className={`${Styles.productDetailContainer}`}>
            {product ? (
                <div className={Styles.productDetail}>
                    <div className={Styles.productImageContainer}>
                        <img
                            src={product.imageSrc}
                            alt={product.title}
                            className={Styles.productImage}
                            style={{ height: '350px', objectFit: 'contain' }}
                        />
                    </div>
                    <div className={Styles.productDetailsContainer}>
                        <h1 className={Styles.productTitle}>{product.title}</h1>
                        <p className={Styles.productDescription}>{product.description}</p>

                        {/* Display average rating */}
                        <div className={Styles.averageRatingContainer}>
                        <p>Total Reviews: {product.totalReviews}</p>
                            <h3>Average Rating: {product.averageRating}</h3>
                           
                            <div>{renderStars(product.averageRating)}</div>
                            
                           
                           
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <button
                                className="btn product-card-btn"
                                style={{
                                    border: "2px solid black",
                                    color: "black",
                                    fontWeight: "bold",
                                    padding: "0.375rem 0.75rem",
                                    borderRadius: "2%",
                                    backgroundColor: "yellow",
                                    display: "inline-block",
                                }}
                            >
                                {product.price} {"$"}
                            </button>

                            <button
                                className="btn product-card-btn"
                                style={{
                                    border: "2px solid black",
                                    color: "white",
                                    fontWeight: "bold",
                                    padding: "0.375rem 0.75rem",
                                    borderRadius: "2%",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                                    display: "inline-block",
                                    backgroundColor: "blue",
                                }}
                                onClick={() => addtocart(product._id, product.title, product.price, 1, product.imageSrc)}
                            >
                                Add to cart
                            </button>
                        </div>

                        {/* Review Form */}
                        {user ? (
                            <div className={Styles.reviewFormContainer} style={{ marginTop: '2rem' }}>
                                <h3>Add a Review</h3>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="review">Review:</label>
                                        <textarea
                                            id="review"
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            placeholder="Write your review here"
                                            rows="4"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="rating">Rating:</label>
                                        <select
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Select Rating</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary mt-3"
                                    >
                                        {loading ? "Submitting..." : "Submit Review"}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <p className="mt-3">Please log in to add a review.</p>
                        )}

                        {/* Display Existing Reviews */}
                        <div className={Styles.reviewsContainer} style={{ marginTop: '2rem' }}>
                            <h3>Customer Reviews</h3>
                            {currentReviews.length > 0 ? (
                                currentReviews.map((rev) => (
                                    <div key={rev._id} className={Styles.review}>
                                        <strong>{rev.userName}</strong> {/* Displaying the reviewer's username */}
                                        <div>{renderStars(rev.rating)}</div>
                                        <p>{rev.reviewText}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}

                            {currentReviews.length < reviews.length && (
                                <button onClick={loadMoreReviews} className="btn btn-link">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={Styles.spinnerContainer}>
                    <div className={Styles.spinner}></div>
                </div>
            )}

            <RelatedProduct category={product?.category} />
        </div>
    );
}

export default ProductDetail;
