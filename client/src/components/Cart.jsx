import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaShoppingCart } from 'react-icons/fa'; // React Icons import
import AppContext from '../context/AppContext';
import Swal from 'sweetalert2';
import '../styles/Cart.css';

function Cart() {
  const { cart, decreaseQty, removeFromCart, checkout, clearCart, addtocart } = useContext(AppContext);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle item removal from the cart
  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId); // Call removeFromCart if confirmed
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  // Function to handle clearing the cart
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your cart items!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart(); // Call the clearCart function if confirmed
        Swal.fire("Cleared!", "Your cart has been cleared.", "success");
      }
    });
  };

  // Calculate total quantity and price when cart changes
  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].Qty; // Corrected property name
        price += cart.items[i].price * cart.items[i].Qty; // Adjust price calculation
      }
    }

    setTotalQty(qty);
    setTotalPrice(price);
  }, [cart]);

  return (
    <div className="cart-container">
      <div className="cart-summary d-flex justify-content-between align-items-center p-3 border rounded mb-4" style={{ backgroundColor: '#d4edda' }}>
        <p className="mb-0">Total Quantity: <strong>{totalQty}</strong></p>
        <p className="mb-0">Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
      </div>

      <h2>Your Cart</h2>

      {cart?.items?.length > 0 ? (
        cart.items.map((product, index) => (
          <div key={index} className="cart-item">
            <img src={product.imageSrc} alt={product.title} className="cart-item-image" />
            <div className="cart-item-details">
              <div>
                <h3>{product.title}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button className="icon-btn" onClick={() => decreaseQty(product.productId, 1)}>
                    <FaMinus />
                  </button>

                  <span className="quantity-display">{product.Qty}</span>
                  <button className="icon-btn" onClick={() => addtocart(product.productId, product.title, product.price / product.Qty, 1, product.imageSrc)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemoveFromCart(product.productId)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-cart-message text-center">
          <h3>Your cart is empty!</h3>
          <Link to="/" className="continue-shopping-button">
            <button>
              <FaShoppingCart className="me-2" /> Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="cart-actions">
        {cart.items?.length > 0 && (
          <>
            <Link to="/shipping" className="checkout-link">
              <button className="checkout-button" onClick={checkout}>Checkout</button>
            </Link>
            <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
