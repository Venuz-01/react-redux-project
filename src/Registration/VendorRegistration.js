import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorRegistration() {
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
    gstValue: "",
    policyId: "",
    brandName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const requiredFields = {
    1: ["username", "email", "password"],
    2: ["address", "pincode", "landmark"],
    3: ["gender", "contactNumber"],
    4: ["gstValue", "policyId", "brandName"],
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

  const handleSubmit = async () => {
    for (let key in formData) {
      if (!formData[key] || !formData[key].toString().trim()) {
        return alert(`Please fill the ${key}`);
      }
    }

    try {
      const resGet = await fetch("http://localhost:3001/vendors");
      const existingVendors = await resGet.json();

      let nextId = 1;
      if (existingVendors.length > 0) {
        const maxId = Math.max(...existingVendors.map((v) => Number(v.id)));
        nextId = maxId + 1;
      }

      const newVendor = {
        id: nextId,
        ...formData,
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
      };

      const res = await fetch("http://localhost:3001/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVendor),
      });

      if (!res.ok) throw new Error("Failed to register vendor");

      alert("Vendor registered successfully! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Registration failed. Try again.");
    }
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
      case 4:
        return (
          <>
            <div className="mb-2">
              <label>GST Value</label>
              <input type="text" name="gstValue" value={formData.gstValue} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Policy ID</label>
              <input type="text" name="policyId" value={formData.policyId} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} {...inputProps} className="form-control" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      {/* Stepper */}
      <div className="d-flex mb-4 justify-content-between position-relative">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="stepper-item text-center"
            style={{
              flex: 1,
              backgroundColor: currentStep === s ? "#6c757d" : currentStep > s ? "#28a745" : "#e0e0e0",
              borderRadius: "8px",
              cursor: "pointer",
              position: "relative",
              padding: "12px 0",
              margin: "0 4px",
              transition: "all 0.3s",
            }}
            onClick={() => handleStepClick(s)}
            onMouseEnter={() => setHoverStep(s)}
            onMouseLeave={() => setHoverStep(null)}
          >
            Step {s}
            {hoverStep === s && (
              <div
                className="hover-card"
                style={{
                  position: "absolute",
                  top: "110%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "320px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  zIndex: 100,
                }}
              >
                {stepContent(s, true)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form with hover card effect */}
      <form
        className="p-4 border rounded"
        onSubmit={(e) => e.preventDefault()}
        style={{
          transition: "all 0.3s",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.25)"}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
      >
        {stepContent(currentStep)}
        <div className="d-flex justify-content-between mt-3">
          {currentStep > 1 && <button type="button" className="btn btn-light" onClick={handleBack}>Back</button>}
          {currentStep < 4 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
          {currentStep === 4 && <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default VendorRegistration;
