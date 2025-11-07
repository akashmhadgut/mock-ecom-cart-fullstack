import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Container, Modal } from "react-bootstrap";
import {
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
} from "./api/api";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const navigate = useNavigate(); // ✅ for navigation

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
    if (localStorage.getItem("token")) {
      loadCart();
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) setUser(userData);
    }
  }, []);

  const loadCart = () => getCart().then((res) => setCart(res.data));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCart({ items: [], total: 0 });
  };

  // ✅ Add or increase quantity
  const handleAdd = async (productId) => {
    if (!user) return alert("Please login first!");
    const existingItem = cart.items.find((i) => i.productId._id === productId);
    const newQty = existingItem ? existingItem.qty + 1 : 1;

    await addToCart({ productId, qty: newQty });
    loadCart();
  };

  // ✅ Decrease quantity or remove if qty becomes 0
  const handleDecrease = async (productId) => {
    const existingItem = cart.items.find((i) => i.productId._id === productId);
    if (!existingItem) return;

    const newQty = existingItem.qty - 1;

    if (newQty <= 0) {
      await removeFromCart(existingItem._id);
    } else {
      await addToCart({ productId, qty: newQty });
    }
    loadCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  // ✅ Checkout then redirect to /receipt
  const handleCheckout = async () => {
    if (!user) return alert("Please login to checkout.");
    const checkoutData = { name: user.name, email: user.email };
    const res = await checkout(checkoutData);
    setReceipt(res.data.receipt);
    loadCart();
    setShowCart(false);
    navigate("/receipt"); // ✅ go to receipt page
  };

  const toggleCart = () => setShowCart(!showCart);

  return (
    <>
      <Navbar user={user} logout={logout} cart={cart} toggleCart={toggleCart} />

      <Routes>
        <Route
          path="/login"
          element={<Login setUser={setUser} loadCart={loadCart} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Container className="py-4">
              <ProductList
                products={products}
                handleAdd={handleAdd}
                handleDecrease={handleDecrease}
                cart={cart}
                user={user}
              />
            </Container>
          }
        />
        {/* ✅ New dedicated Receipt page */}
        <Route
          path="/receipt"
          element={<Receipt receipt={receipt} />}
        />
      </Routes>

      <Modal show={showCart} onHide={toggleCart} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title> <div className="d-flex align-items-center mb-4">
          <FaShoppingCart className="me-2 text-primary" size={30} />
          <h4 className="fw-bold mb-0">Your Cart </h4>
        </div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart
            cart={cart}
            handleAdd={handleAdd}
            handleDecrease={handleDecrease}
            handleRemove={handleRemove}
            handleCheckout={handleCheckout}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

// ✅ Wrap with Router for navigation to work
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
