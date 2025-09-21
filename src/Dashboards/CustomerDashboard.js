import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// Carousel images
import banner5 from "../images/banner5.jpg";
import banner6 from "../images/banner6.jpg";
import banner7 from "../images/banner7.jpg";

// Carousel Component
function CarouselComp() {
  return (
    <div id="mainCarousel" className="carousel slide mt-3" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={banner7}
            className="d-block w-100"
            alt="Banner 1"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={banner6}
            className="d-block w-100"
            alt="Banner 2"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={banner5}
            className="d-block w-100"
            alt="Banner 3"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

// Customer Dashboard
function CustomerDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null); // Ref for profile dropdown

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("loggedInCustomer"));
    if (!c) {
      navigate("/"); // redirect to Home page if not logged in
      return;
    }
    setCustomer(c);

    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInCustomer");
    navigate("/"); // redirect to Home page on logout
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!customer) return null;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Welcome, {customer.username}</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control me-2"
            style={{ width: "250px" }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

          {/* Profile Pic */}
          <div className="position-relative" ref={profileRef}>
            <img
              src="https://img.freepik.com/premium-photo/smiling-cartoon-boy-pink-shirt_1410957-55144.jpg"
              alt="Profile"
              className="rounded-circle border border-light"
              style={{ cursor: "pointer", width: "45px", height: "45px", objectFit: "cover" }}
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div
                className="position-absolute bg-white text-dark p-3 shadow rounded"
                style={{ right: 0, top: "55px", minWidth: "200px", zIndex: 1000 }}
              >
                <p className="mb-1 fw-bold">{customer.username}</p>
                <p className="mb-2 text-muted">{customer.email}</p>
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <CarouselComp />

      {/* Products */}
      <div className="container mt-4">
        <h3>Products</h3>
        <div className="row mt-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Price: ₹{p.price}</p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => setCart([...cart, p])}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setSaved([...saved, p])}
                    >
                      <FaHeart /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && <p>No products found.</p>}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
