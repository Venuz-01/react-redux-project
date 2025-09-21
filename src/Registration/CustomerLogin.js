import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = loginData.email.trim().toLowerCase();
      const res = await fetch(`http://localhost:3002/customers?email=${email}`);
      const customers = await res.json();

      if (customers.length === 0 || customers[0].password.trim() !== loginData.password.trim()) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("loggedInCustomer", JSON.stringify(customers[0]));
      alert("Login Successful!");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
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
