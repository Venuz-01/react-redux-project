import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavbarComp() {
  const navigate = useNavigate();
  const [showGuestProfile, setShowGuestProfile] = useState(false);
  const profileRef = useRef(null);

  // Sign Up navigation
  const handleVendorSignup = () => navigate("/vendor-registration");
  const handleCustomerSignup = () => navigate("/customer-registration");

  // Login navigation
  const handleVendorLogin = () => navigate("/login");
  const handleCustomerLogin = () => navigate("/customer-login");

  // Navigate home
  const goHome = () => navigate("/");

  // Close the guest dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowGuestProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={goHome}
        >
          The Abstract Collective
        </div>

        <div className="d-flex align-items-center ms-auto">
          {/* Sign Up Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Sign Up
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleVendorSignup}>
                  As Vendor
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleCustomerSignup}
                >
                  As Customer
                </button>
              </li>
            </ul>
          </div>

          {/* Vendor Login */}
          <button
            className="btn btn-success ms-2"
            onClick={handleVendorLogin}
          >
            Vendor Login
          </button>

          {/* Customer Login */}
          <button
            className="btn btn-outline-light ms-2"
            onClick={handleCustomerLogin}
          >
            Customer Login
          </button>

          {/* Guest Profile */}
          <div className="position-relative" ref={profileRef}>
            <img
              src="https://img.freepik.com/premium-photo/cartoon-smiley-female-lady-profile-avatar-illustration-3d_717906-125044.jpg"
              alt="Guest Profile"
              className="rounded-circle border border-light"
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                objectFit: "cover",
              }}
              onClick={() => setShowGuestProfile(!showGuestProfile)}
            />
            {showGuestProfile && (
              <div
                className="position-absolute bg-white text-dark p-2 shadow rounded"
                style={{
                  right: 0,
                  top: "45px",
                  minWidth: "120px",
                  zIndex: 1000,
                }}
              >
                <p className="mb-0 fw-bold text-center">Guest</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;
