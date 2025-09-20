// CustomerRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hoverStep, setHoverStep] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    landmark: "",
    gender: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const requiredFields = {
    1: ["username", "email", "password"],
    2: ["address", "pincode", "landmark"],
    3: ["gender", "contactNumber"],
  };

  const validateStep = (step) => {
    for (let field of requiredFields[step]) {
      if (!formData[field] || !formData[field].toString().trim()) {
        alert(`Please fill the ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleStepClick = (step) => {
    if (step > currentStep && !validateStep(currentStep)) return;
    setCurrentStep(step);
  };

  const handleSubmit = () => {
    for (let key in formData) {
      if (!formData[key] || !formData[key].toString().trim()) {
        return alert(`Please fill the ${key}`);
      }
    }

    const normalizedEmail = formData.email.trim().toLowerCase();
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    if (customers.some((c) => c.email.toLowerCase() === normalizedEmail)) {
      return alert("Email already registered!");
    }

    const newCustomer = {
      id: `c${customers.length + 1}`,
      ...Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
      ),
    };
    newCustomer.email = normalizedEmail;

    customers.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Customer registered successfully! Redirecting to login...");
    navigate("/customer-login");
  };

  const stepContent = (step, readOnly = false) => {
    const inputProps = readOnly ? { readOnly: true, disabled: true } : {};
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-2">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-2">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Landmark</label>
              <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-2">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} {...inputProps} className="form-control">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3 text-center">Customer Registration</h3>

      {/* Stepper */}
      <div className="d-flex mb-3 justify-content-between position-relative">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="stepper-item p-2 text-center"
            style={{
              flex: 1,
              backgroundColor: currentStep === s ? "gray" : currentStep > s ? "green" : "lightgray",
              borderRadius: "5px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleStepClick(s)}
            onMouseEnter={() => setHoverStep(s)}
            onMouseLeave={() => setHoverStep(null)}
          >
            Step {s}
            {hoverStep === s && (
              <div className="position-absolute bg-white border p-2" style={{ top: "110%", left: "0", zIndex: 10, width: "300px" }}>
                {stepContent(s, true)}
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="p-3 border rounded shadow-sm" onSubmit={(e) => e.preventDefault()}>
        {stepContent(currentStep)}
        <div className="d-flex justify-content-between mt-3">
          {currentStep > 1 && <button type="button" className="btn btn-light" onClick={handleBack}>Back</button>}
          {currentStep < 3 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
          {currentStep === 3 && <button type="button" className="btn btn-success w-100" onClick={handleSubmit}>Register</button>}
        </div>
      </form>
    </div>
  );
}

export default CustomerRegistration;
