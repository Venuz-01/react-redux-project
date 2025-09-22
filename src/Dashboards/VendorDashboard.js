import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VendorProductForm from "../components/VendorProductForm";

function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const profileRef = useRef(null);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      const allProducts = await res.json();
      const vendorProducts = allProducts.filter(
        (p) => Number(p.vendorId) === Number(vendor?.id)
      );
      setProducts(vendorProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    const loggedVendor = JSON.parse(localStorage.getItem("loggedInVendor"));
    if (!loggedVendor) {
      navigate("/");
      return;
    }
    setVendor(loggedVendor);
  }, [navigate]);

  useEffect(() => {
    if (vendor) fetchProducts();
  }, [vendor]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInVendor");
    navigate("/");
  };

 
  const handleDelete = async (id) => {
    try {
    
      await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });

      
      const vendorRes = await fetch(`http://localhost:3001/vendors/${vendor.id}`);
      const vendorData = await vendorRes.json();
      const updatedVendor = {
        ...vendorData,
        products: (vendorData.products || []).filter((p) => p.id !== id),
      };
      await fetch(`http://localhost:3001/vendors/${vendor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVendor),
      });

      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!vendor) return <p className="text-center mt-5">Loading vendor...</p>;

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
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true);
              setProductToEdit(null);
            }}
          >
            Add Product
          </button>

          {/* Profile */}
          <div className="position-relative" ref={profileRef}>
            <img
              src="https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-136.jpg"
              alt="Vendor Profile"
              className="rounded-circle border border-light"
              style={{ cursor: "pointer", width: "45px", height: "45px", objectFit: "cover" }}
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div
                className="position-absolute bg-white text-dark p-3 shadow rounded"
                style={{ right: 0, top: "55px", minWidth: "220px", zIndex: 1000 }}
              >
                <p className="mb-1 fw-bold">{vendor.username}</p>
                <p className="mb-1 text-muted">{vendor.email}</p>
                <p className="mb-2 text-muted">
                  <strong>Vendor Id:</strong> {vendor.policyId}
                </p>
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Products */}
      <div className="container mt-4">
        <h3>Welcome, {vendor.username}</h3>
        <div className="row mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "220px", backgroundColor: "#f8f9fa", overflow: "hidden" }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Price: ₹{p.price}</p>
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setProductToEdit(p);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
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
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>

      {/* Vendor Product Form */}
      {showForm && (
        <VendorProductForm
          vendor={vendor}
          productToEdit={productToEdit}
          onClose={() => setShowForm(false)}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
}

export default VendorDashboard;
