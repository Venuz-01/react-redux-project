// VendorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorProducts from "../Data/vendorProducts.json";

function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const v = JSON.parse(localStorage.getItem("loggedInVendor"));
    if (!v) {
      navigate("/");
      return;
    }
    setVendor(v);
    setProducts(vendorProducts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInVendor");
    navigate("/");
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!vendor) return null;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Vendor Collection</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control me-2"
            style={{ width: "250px" }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary">Add Product</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Products Section */}
      <div className="container mt-4">
        <h3>Welcome, {vendor.username}</h3>
        <div className="row mt-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={{
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 8px 20px rgba(0,0,0,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 2px 6px rgba(0,0,0,0.1)")
                }
              >
                {/* Image Section */}
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Price: ${p.price}</p>
                    <p className="card-text">
                      <strong>Vendor Id:</strong> {vendor.policyId}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
