import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarComp() {
  const navigate = useNavigate();

  // Sign Up navigation
  const handleVendorSignup = () => navigate("/vendor-registration");
  const handleCustomerSignup = () => navigate("/customer-registration");

  // Login navigation
  const handleVendorLogin = () => navigate("/login");
  const handleCustomerLogin = () => navigate("/customer-login");

  // Navigate home
  const goHome = () => navigate("/");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <div className="navbar-brand" style={{ cursor: "pointer" }} onClick={goHome}>
          The Abstract Collective
        </div>

        <div className="ms-auto d-flex align-items-center">
          {/* Sign Up Dropdown */}
          <div className="dropdown me-2">
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
                <button className="dropdown-item" onClick={handleCustomerSignup}>
                  As Customer
                </button>
              </li>
            </ul>
          </div>

          {/* Login Buttons */}
          <button className="btn btn-success me-2" onClick={handleVendorLogin}>
            Vendor Login
          </button>
          <button className="btn btn-outline-light" onClick={handleCustomerLogin}>
            Customer Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;
