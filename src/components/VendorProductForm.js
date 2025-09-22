import React, { useState, useEffect } from "react";

function VendorProductForm({ vendor, productToEdit, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", price: "", image: "", vendorId: vendor.id });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ name: "", price: "", image: "", vendorId: vendor.id });
    }
  }, [productToEdit, vendor.id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        // EDIT
        await fetch(`http://localhost:3001/products/${productToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // ADD
        const res = await fetch("http://localhost:3001/products");
        const allProducts = await res.json();
        const nextId = allProducts.length ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
        const newProduct = { ...formData, id: nextId };

        await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
      }

      onSave(); 
      onClose(); 
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{productToEdit ? "Edit Product" : "Add Product"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Image URL</label>
                <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-success w-100">{productToEdit ? "Update Product" : "Add Product"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProductForm;
