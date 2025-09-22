import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    // You can later redirect to a payment or confirmation page
    alert("🧾 Checkout initiated!");
    // navigate("/checkout"); // Uncomment when checkout route is ready
  };

  return (
    <>
      {/* Minimal header */}
      <header className="bg-dark text-white p-3 mb-4">
        <h3 className="mb-0">🛒 Your Cart</h3>
      </header>

      <div className="container mb-5">
        {cart.length === 0 ? (
          <div className="text-center">
            <p>No products in your cart.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/customer-dashboard")}
            >
              ← Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="row">
              {cart.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{
                        height: "180px",
                        objectFit: "contain",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        Price: ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary Section */}
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/customer-dashboard")}
                >
                  ← Continue Shopping
                </button>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Total Price of Products</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{item.name}</span>
                        <span>₹{item.price.toLocaleString("en-IN")}</span>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between fw-bold">
                      <span>Total</span>
                      <span className="text-success">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </li>
                  </ul>
                  <div className="card-footer text-end">
                    <button className="btn btn-warning" onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;