import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    const customer = customers.find(
      (c) =>
        c.email.toLowerCase().trim() === loginData.email.toLowerCase().trim() &&
        c.password.trim() === loginData.password.trim()
    );

    if (customer) {
      localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
      alert("Customer Login Successful!");
      setError("");
      navigate("/customer-dashboard"); // ✅ redirect
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Customer Login</h3>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={loginData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" required />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
