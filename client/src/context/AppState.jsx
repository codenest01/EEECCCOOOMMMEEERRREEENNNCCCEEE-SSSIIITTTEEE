import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AppState(props) {
    const url = 'http://localhost:5000/api/v1';
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [filteredData, setFilteredData] = useState([]);
    const [cart, setCart] = useState([]);
    const [useraddress, setUseraddress] = useState(null);
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);


    const axiosInstance = axios.create({
        baseURL: url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    });

    const fetchProducts = async () => {
        try {
            const api = await axios.get(`${url}/get-all-products`, { headers: { "Content-Type": "application/json" }, withCredentials: true });
            const allProducts = api.data.allproducts;
            setProducts(allProducts);
            if (filteredData.length === 0) { // Set filteredData only if it's empty
                setFilteredData(allProducts);
            }
            await userprofile();
            await usercart();
            await getAddress();
            await getFavProd()
        } catch (error) {
            console.error("Error fetching products:", error);
            handleError(error, "Could not fetch products.");
        }
    };
    
   
    
    useEffect(() => {
        fetchProducts();
        getFavProd()
    }, [token]);


    const register = async (name, email, password) => {
        try {
            const response = await axiosInstance.post('/signup', { name, email, password });
            toast.success(response.data.msg, { position: "top-right", autoClose: 2000 });
            return { success: true };
        } catch (error) {
            handleError(error, "Registration failed.");
            return { success: false };
        }
    };

   
    const login = async (email, password) => {
        try {
          const response = await axiosInstance.post('/login', { email, password });
          const newToken = response.data.token;
          setToken(newToken);
          localStorage.setItem("token", newToken);
          setIsAuthenticated(true);
      
          // Toast notification with auto close and manual close on click
         
      
          return { success: true };
        } catch (error) {
          handleError(error, "Login failed.");
          return { success: false };
        }
      };
      
    

    const logout = () => {
        setIsAuthenticated(false);
        setToken('');
        localStorage.removeItem("token");
        toast.success("Logout Successful", { position: "top-right", autoClose: 2000 });
    };

    const userprofile = async () => {
        try {
            const api = await axiosInstance.get('/profile');
            setUser(api.data);
            return api;
        } catch (error) {
            handleError(error, "Error fetching user profile.");
            throw error;
        }
    };

    const addtocart = async (productId, title, price, Qty, imageSrc) => {
        try {
            await axiosInstance.post('/add-to-cart', { productId, title, price, Qty, imageSrc });
            fetchProducts(); // Only reload necessary data
            toast.success("Product added to cart successfully!", { position: "top-right", autoClose: 2000 });
        } catch (error) {
            handleError(error, "Error adding to cart.");
        }
    };

  
    const decreaseQty = async (productId, Qty) => {
        try {
            const api = await axiosInstance.post('/decrease-product', { productId, Qty });
            fetchProducts();
            toast.success(api.data.msg, { position: "top-right", autoClose: 2000 });
        } catch (error) {
            handleError(error, "Could not decrease quantity.");
        }
    };

    const clearCart = async () => {
        try {
            const response = await axiosInstance.post('/clear-cart', {});
            fetchProducts();
            toast.success(response.data.msg, { position: "top-right", autoClose: 2000 });
        } catch (error) {
            handleError(error, "Could not clear cart.");
        }
    };

    const shippingadress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
        try {
            const api = await axiosInstance.post('/add-shipping-address', { fullName, address, city, state, country, pincode, phoneNumber });
            getAddress();
            toast.success(api.data.msg, { position: "top-right", autoClose: 2000 });
        } catch (error) {
            handleError(error, "Error adding address.");
        }
    };

    const getAddress = async () => {
        try {
            const api = await axiosInstance.get('/get-shipping-address');
            setUseraddress(api.data.userAddress.length > 0 ? api.data.userAddress : null);
        } catch (error) {
            handleError(error, "Error fetching address.");
            setUseraddress(null);
        }
    };

   
    const addToFavorites = async (productId, title, price, imageSrc) => {
        try {
            const response = await axiosInstance.post('/add-to-fav', { productId, title, price, imageSrc });
    
            if (response.data.msg === "Item added to favorites successfully") {
                toast.success("Added to Favourite!");
    
            }
            fetchProducts();
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Error adding to favorites.");
        }
    };
    
    
    
    const usercart = async () => {
        try {
            const api = await axiosInstance.get('/get-user-cart');
            setCart(api.data.cart);
        } catch (error) {
            handleError(error, "Could not fetch cart.");
        }
    };

    
    const getFavProd = async () => {
        try {
            const response = await axiosInstance.get('/get-fav-prod');
            // console.log("Fetched favorites:", response.data.items); // Log the response data
    
                setFavorites(response.data.items);
           
            return response;
        } catch (error) {
            handleError(error, "Error fetching favorite products.");
            throw error;
        }
    };
    
      
    const removeFromCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/remove-product-from-cart/${productId}`, {});
            fetchProducts();
            toast.success(response.data.msg, { position: "top-right", autoClose: 2000 });
        } catch (error) {
            handleError(error, "Could not remove item.");
        }
    };


    const removeFav = async (productId) => {
        try {
            const response = await axiosInstance.post(`/del-fav-prod/${productId}`, {});
            fetchProducts();  // Fetch the updated product list
            toast.success(response.data.msg, { position: "top-right", autoClose: 2000 });
            return { success: true };  // Return success property
        } catch (error) {
            console.error("Error removing favorite:", error);
            throw new Error("Failed to remove item from favorites.");
        }
    };
    
    
   
    return (
        <AppContext.Provider value={{
            products, register, login, logout, url, token, isAuthenticated,
            setIsAuthenticated, filteredData, setFilteredData, addtocart, usercart, userprofile, cart, removeFromCart, decreaseQty, clearCart,
            shippingadress, useraddress, getAddress, user,addToFavorites,getFavProd,favorites,removeFav
        }}>
            {props.children}
            <ToastContainer />
        </AppContext.Provider>
    );
}

export default AppState;
