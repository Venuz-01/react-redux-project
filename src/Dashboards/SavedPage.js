import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedPage() {
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedItems")) || [];
    setSavedItems(items);
  }, []);

  const handleRemove = (id) => {
    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem("savedItems", JSON.stringify(updated));
  };

  return (
    <>
      <header className="bg-warning text-dark p-3 mb-4">
        <h3 className="mb-0">Wishlist</h3>
      </header>

      <div className="container mb-5">
        {savedItems.length === 0 ? (
          <div className="text-center">
            <p>No saved items yet.</p>
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
              {savedItems.map((item) => (
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
                      <p className="card-text">Price: ₹{item.price}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                       Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-start mt-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/customer-dashboard")}
              >
                ← Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SavedPage;