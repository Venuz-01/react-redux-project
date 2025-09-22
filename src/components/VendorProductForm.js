import React, { useState, useEffect } from "react";

function VendorProductForm({ vendor, productToEdit, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", price: "", image: "", id: null });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ name: "", price: "", image: "", id: null });
    }
  }, [productToEdit]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch latest vendor from backend
      const vendorRes = await fetch(`http://localhost:3001/vendors/${vendor.id}`);
      if (!vendorRes.ok) throw new Error("Vendor not found");
      const vendorData = await vendorRes.json();

      // Ensure products array exists
      let updatedProducts = Array.isArray(vendorData.products) ? vendorData.products : [];

      if (productToEdit) {
        // Update existing product
        updatedProducts = updatedProducts.map((p) =>
          String(p.id) === String(productToEdit.id)
            ? { ...formData, id: productToEdit.id }
            : p
        );
      } else {
        // Add new product with incremental id
        const numericIds = updatedProducts.map((p) => Number(p.id)).filter((id) => !isNaN(id));
        const nextId = numericIds.length ? Math.max(...numericIds) + 1 : 1;

        updatedProducts.push({ ...formData, id: nextId });
      }

      // Update the entire vendor object with PUT
      const updateRes = await fetch(`http://localhost:3001/vendors/${vendor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...vendorData,       // preserve other fields
          products: updatedProducts
        }),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update vendor");
      }

      onSave(); // Refresh product list
      onClose(); // Close modal
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
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                {productToEdit ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProductForm;
