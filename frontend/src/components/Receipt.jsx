import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaReceipt } from "react-icons/fa";

const Receipt = ({ receipt }) => {
  const navigate = useNavigate();

  if (!receipt)
    return (
      <Container className="text-center mt-5">
        <h4>No receipt found.</h4>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-sm p-4 border-0" style={{ maxWidth: "600px", width: "100%" }}>
        
        {/* Header */}
        <div className="d-flex align-items-center mb-4 border-bottom pb-3">
          <FaReceipt size={26} className="me-2 text-primary" />
          <h3 className="fw-semibold mb-0">Order Receipt</h3>
        </div>

        {/* User Info */}
        <div className="mb-3">
          <p className="mb-2">
            <strong className="text-dark">Name:</strong> {receipt.name}
          </p>
          <p className="mb-2">
            <strong className="text-dark">Email:</strong> {receipt.email}
          </p>
        </div>

        {/* Divider */}
        <hr />

        {/* Total Section */}
        <div className="d-flex justify-content-between align-items-center py-2">
          <h5 className="fw-semibold text-dark mb-0">Total Amount:</h5>
          <h4 className="fw-bold text-success mb-0">₹{receipt.total}</h4>
        </div>

        {/* Date */}
        <p className="text-muted mt-2">
          {new Date(receipt.timestamp).toLocaleString()}
        </p>

        {/* Footer Button */}
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="mt-4 py-2 fw-semibold"
          style={{ borderRadius: "8px" }}
        >
          Back to Home →
        </Button>

      </Card>
    </Container>
  );
};

export default Receipt;
