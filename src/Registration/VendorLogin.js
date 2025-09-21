import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // hover state

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/vendors");
      const vendors = await res.json();

      const vendor = vendors.find(
        (v) =>
          v.username.trim().toLowerCase() === loginData.username.trim().toLowerCase() &&
          v.password.trim() === loginData.password.trim()
      );

      if (!vendor) {
        setError("Invalid username or password");
        return;
      }

      setError("");
      localStorage.setItem("loggedInVendor", JSON.stringify(vendor));
      navigate("/vendor-dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentails/Create an account");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Vendor Login</h3>
      <form
        onSubmit={handleSubmit}
        className="p-3 border rounded shadow-sm"
        style={{
          transition: "all 0.3s ease",
          boxShadow: isHovered
            ? "0 8px 20px rgba(0,0,0,0.3)"
            : "0 4px 10px rgba(0,0,0,0.1)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
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
        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default VendorLogin;
