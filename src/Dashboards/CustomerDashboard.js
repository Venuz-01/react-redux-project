// CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customerProducts from "../Data/CustomerProducts.json";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("loggedInCustomer"));
    if (!c) {
      navigate("/customer-login");
      return;
    }
    setCustomer(c);
    setProducts(customerProducts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInCustomer");
    navigate("/customer-login");
  };

  const handleAddToCart = (product) => {
    if (!cart.some((p) => p.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const handleSaveForLater = (product) => {
    if (!saved.some((p) => p.id === product.id)) {
      setSaved([...saved, product]);
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSearch("");
  };

  const filteredProducts = showAll
    ? products
    : products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (!customer) return null;

  // Featured carousel images using URLs
  const featuredImages = [
    "https://leelinesourcing.com/wp-content/uploads/2022/11/original_200219061202_5e4cd1b2c5eb3-1024x682.jpg",
    "https://images.vexels.com/media/users/3/194701/raw/aa72abca784117244de372b5e9926988-online-shopping-slider-template.jpg",
    "https://i.pinimg.com/originals/51/d3/88/51d38806d50482762c700eca5717a32f.png"
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Customer Products</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control me-2"
            style={{ width: "250px" }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowAll(false);
            }}
          />
          <button className="btn btn-info" onClick={handleShowAll}>
            All Products
          </button>
          <button className="btn btn-outline-light position-relative me-2">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
          <button className="btn btn-outline-light position-relative me-2">
            <FaHeart />
            {saved.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {saved.length}
              </span>
            )}
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h3>Welcome, {customer.username}</h3>

        {/* Carousel */}
        <div id="featuredCarousel" className="carousel slide my-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {featuredImages.map((url, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                <img
                  src={url}
                  className="d-block w-100"
                  style={{ height: "300px", objectFit: "cover", backgroundColor: "#f8f9fa" }}
                  alt={`Featured ${idx + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="row mt-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm" style={{ transition: "0.3s" }}>
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
                    src={p.image} // Make sure p.image is also a URL
                    alt={p.name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Price: ${p.price}</p>
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(p)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleSaveForLater(p)}
                    >
                      <FaHeart /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && <p className="text-center">No products found.</p>}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
