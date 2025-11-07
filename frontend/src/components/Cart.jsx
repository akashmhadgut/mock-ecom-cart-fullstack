import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Cart = ({ cart, handleAdd, handleDecrease, handleRemove, handleCheckout }) => {
  return (
    <Card className="mt-4 shadow-sm border-0 rounded-3">
      <Card.Body>
        {cart.items.length === 0 ? (
          <p className="text-muted text-center py-5 fs-5">Your cart is empty 🛍️</p>
        ) : (
          <>
            {cart.items.map((i) => (
              <div
                key={i._id}
                className="d-flex flex-wrap flex-md-nowrap align-items-center border-bottom py-3 gap-3"
              >
                {/* 🖼️ Product Thumbnail */}
                <div
                  className="flex-shrink-0 mx-auto mx-md-0"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#f8f9fa",
                  }}
                >
                  <img
                    src={i.productId.image}
                    alt={i.productId.name}
                    className="w-100 h-100 object-fit-contain"
                  />
                </div>

                {/* 📦 Product Details */}
                <div className="flex-grow-1 text-center text-md-start">
                  <h6 className="fw-semibold text-dark mb-1" style={{ fontSize: "1rem" }}>
                    {i.productId.name}
                  </h6>
                  <small className="text-muted">₹{i.productId.price} each</small>
                </div>

                {/* 🔢 Quantity Controls */}
                <div className="d-flex align-items-center justify-content-center justify-content-md-start my-2 my-md-0">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-circle"
                    onClick={() => handleDecrease(i.productId._id)}
                    style={{ width: "32px", height: "32px" }}
                  >
                    −
                  </Button>

                  <span className="mx-3 fw-semibold fs-6">{i.qty}</span>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-circle"
                    onClick={() => handleAdd(i.productId._id)}
                    style={{ width: "32px", height: "32px" }}
                  >
                    +
                  </Button>
                </div>

                {/* 💰 Price */}
                <div className="text-center text-md-end fw-semibold text-dark">
                  ₹{(i.productId.price * i.qty).toFixed(2)}
                </div>

                {/* 🗑️ Remove */}
                <div className="text-center text-md-end mt-2 mt-md-0">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-circle"
                    onClick={() => handleRemove(i._id)}
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FaTrash size={12} />
                  </Button>
                </div>
              </div>
            ))}

            {/* 🧾 Total Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 pt-3 border-top text-center text-md-start">
              <h5 className="fw-semibold text-dark mb-2 mb-md-0">Total</h5>
              <h4 className="fw-bold text-primary">₹{cart.total.toFixed(2)}</h4>
            </div>

            {/* 💳 Checkout Button */}
            <div className="text-center text-md-end mt-4">
              <Button
                onClick={handleCheckout}
                className="px-4 py-2 fw-semibold"
                style={{
                  borderRadius: "8px",
                  fontSize: "1rem",
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                Proceed to Checkout →
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Cart;
