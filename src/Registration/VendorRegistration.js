// VendorRegistration.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hoverStep, setHoverStep] = useState(null);
  const [formData, setFormData] = useState({
    username: "", email: "", password: "",
    address: "", pincode: "", landmark: "",
    gender: "", contactNumber: "", gstValue: "",
    policyId: "", brandName: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vendors") || "[]");
    // You don't really need to setVendors here unless showing a list
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const requiredFields = {
    1: ["username", "email", "password"],
    2: ["address", "pincode", "landmark"],
    3: ["gender", "contactNumber"],
    4: ["gstValue", "policyId", "brandName"]
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
    setCurrentStep(s => s + 1);
  };

  const handleBack = () => setCurrentStep(s => s - 1);

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
    const latest = JSON.parse(localStorage.getItem("vendors") || "[]");

    if (latest.some(v => (v.email || "").toLowerCase() === normalizedEmail)) {
      return alert("Email already registered!");
    }

    const newVendor = {
      id: `v${latest.length + 1}`,
      ...Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
      )
    };
    newVendor.email = normalizedEmail;

    const updated = [...latest, newVendor];
    localStorage.setItem("vendors", JSON.stringify(updated));

    alert("Vendor registered successfully! Redirecting to login...");
    navigate("/login");
  };

  const stepContent = (step, readOnly = false) => {
    const inputProps = readOnly ? { readOnly: true, disabled: true } : {};
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-2"><label>Username</label><input type="text" name="username" value={formData.username} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} {...inputProps} className="form-control" /></div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-2"><label>Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Pincode</label><input type="text" name="pincode" value={formData.pincode} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Landmark</label><input type="text" name="landmark" value={formData.landmark} onChange={handleChange} {...inputProps} className="form-control" /></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-2"><label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} {...inputProps} className="form-control">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-2"><label>Contact Number</label><input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} {...inputProps} className="form-control" /></div>
          </>
        );
      case 4:
        return (
          <>
            <div className="mb-2"><label>GST Value</label><input type="text" name="gstValue" value={formData.gstValue} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Policy ID</label><input type="text" name="policyId" value={formData.policyId} onChange={handleChange} {...inputProps} className="form-control" /></div>
            <div className="mb-2"><label>Brand Name</label><input type="text" name="brandName" value={formData.brandName} onChange={handleChange} {...inputProps} className="form-control" /></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="d-flex mb-3 justify-content-between position-relative">
        {[1, 2, 3, 4].map(s => (
          <div
            key={s}
            className="stepper-item p-2 text-center"
            style={{
              flex: 1,
              backgroundColor: currentStep === s ? "gray" : currentStep > s ? "green" : "lightgray",
              borderRadius: "5px",
              cursor: "pointer",
              position: "relative"
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

      <form className="p-4 border rounded" onSubmit={(e) => e.preventDefault()}>
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
