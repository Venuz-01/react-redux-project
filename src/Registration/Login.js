// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = (loginData.email || "").trim().toLowerCase();
    const password = (loginData.password || "").trim();

    // Retrieve vendors from localStorage
    let vendors = [];
    try {
      vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    } catch (error) {
      console.error("Failed to parse vendors from localStorage", error);
      return setLoginError("Something went wrong. Try again.");
    }

    // Debugging
    console.log("Stored vendors:", vendors);
    console.log("Trying to login with:", { email, password });

    // Look for a matching vendor
    const vendor = vendors.find((v) =>
      (v.email || "").toLowerCase().trim() === email &&
      (v.password || "").trim() === password
    );

    if (vendor) {
      localStorage.setItem("loggedInVendor", JSON.stringify(vendor));
      setLoginError("");
      navigate("/vendor-dashboard");
    } else {
      setLoginError("Invalid email or password!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4">
        <h4 className="mb-3 text-center">Vendor Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {loginError && (
            <div className="text-danger mb-2">{loginError}</div>
          )}
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
