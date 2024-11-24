import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

  
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus,AiOutlineDelete  } from "react-icons/ai";
import AppContext from "../context/AppContext";
import Swal from "sweetalert2";

function Checkout() {
  const {
    cart,
    decreaseQty,
    removeFromCart,
    addtocart,
    useraddress,
    getAddress,
  } = useContext(AppContext);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    const qty = cart.items.reduce((acc, item) => acc + item.Qty, 0);
    const price = cart.items.reduce(
      (acc, item) => acc + item.price * item.Qty,
      0
    );
    setTotalQty(qty);
    setTotalPrice(price);
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4, px: 2 }}>
      {/* Checkout Table */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Adjust Quantity</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.length > 0 ? (
                cart.items.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={product.imageSrc}
                        alt={product.title}
                        style={{ width: 60, height: "auto" }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.Qty}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => decreaseQty(product.productId, 1)}
                        color="primary"
                        size="small"
                      >
                        <AiOutlineMinus />
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          addtocart(
                            product.productId,
                            product.title,
                            product.price / product.Qty,
                            1,
                            product.imageSrc
                          )
                        }
                        color="primary"
                        size="small"
                      >
                        <AiOutlinePlus />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveFromCart(product.productId)}
                        color="secondary"
                        size="small"
                      >
                        <AiOutlineDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Your cart is empty!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Quantity and Price */}
        <Grid container justifyContent="space-between" sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6">Total Quantity: {totalQty}</Typography>
          <Typography variant="h6">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </Grid>

        {/* Conditional Buttons */}
        <Button className="mb-5"
          variant="contained"
          color={cart.items.length === 0 ? "primary" : "success"}
          fullWidth
          sx={{ mt: 2 }}
          onClick={() =>
            cart.items.length === 0
              ? navigate("/products")
              : alert("Proceeding to payment")
          }
        >
          {cart.items.length === 0 ? "Continue Shopping" : "Proceed to Pay"}
        </Button>
      </Grid>

      {/* Address Section */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Shipping Address
        </Typography>
        {useraddress ? (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(useraddress[0]).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container direction="column" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body1">No address found.</Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/shipping")}
            >
              Add Shipping Address
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Checkout;
