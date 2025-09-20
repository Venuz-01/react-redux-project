import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavbarComp() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const loginRef = useRef(null);

  // Sign Up navigation
  const handleVendorSignup = () => navigate("/vendor-registration");
  const handleCustomerSignup = () => navigate("/customer-registration");

  // Login form handlers
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Replace this check with your actual login verification
    if (loginData.username === "admin" && loginData.password === "1234") {
      alert("Login Successful!");
      setShowLogin(false);
      setLoginError(false);
      setLoginData({ username: "", password: "" });
      navigate("/vendor-products"); // Navigate to vendor page
    } else {
      setLoginError(true);
    }
  };

  // Navigate to homepage
  const goHome = () => {
    setShowLogin(false);
    navigate("/");
  };

  // Close login form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
        setLoginData({ username: "", password: "" }); // Reset fields
        setLoginError(false); // Reset error
      }
    };

    if (showLogin) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogin]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        {/* Navbar Title */}
        <div className="navbar-brand" style={{ cursor: "pointer" }} onClick={goHome}>
          The Abstract Collective
        </div>

        <div className="ms-auto d-flex align-items-center">
          {/* Sign Up Dropdown */}
          <div className="dropdown me-2">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Sign Up
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={handleVendorSignup}>As Vendor</button></li>
              <li><button className="dropdown-item" onClick={handleCustomerSignup}>As Customer</button></li>
            </ul>
          </div>

          {/* Login Form */}
          <div className="position-relative" ref={loginRef}>
            <button
              className="btn btn-success"
              onClick={() => {
                setShowLogin(!showLogin);
                setLoginData({ username: "", password: "" }); // Reset fields
                setLoginError(false); // Reset error
              }}
            >
              Login
            </button>

            {showLogin && (
              <div className="card p-3 position-absolute" style={{ top: "100%", right: 0, width: "250px", zIndex: 1000 }}>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-2">
                    <label className="form-label small">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 btn-sm">Login</button>

                  {loginError && (
                    <div className="text-center mt-2">
                      <small>
                        Invalid credentials.{" "}
                        <button
                          type="button"
                          className="btn btn-link p-0 btn-sm"
                          onClick={() => { setShowLogin(false); setLoginError(false); navigate("/"); }}
                        >
                          Create a new account
                        </button>
                      </small>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;
