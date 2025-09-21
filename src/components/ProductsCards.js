import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../style/style.css";

function ProductsGrid() {
  const products = useSelector((state) => state.products);

  // Assuming you store login status in localStorage
  const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));

  const [liked, setLiked] = useState({});
  const [cartMessage, setCartMessage] = useState({});
  const [wishlistMessage, setWishlistMessage] = useState({});

  const toggleLike = (id, name) => {
    setLiked((allWishlist) => ({ ...allWishlist, [id]: !allWishlist[id] }));

    if (!liked[id]) {
      setWishlistMessage({ [id]: `${name} added to wishlist ` });

      setTimeout(() => {
        setWishlistMessage((allWishlist) => {
          const updated = { ...allWishlist };
          delete updated[id];
          return updated;
        });
      }, 2000);
    }
  };

  const addToCart = (id, name) => {
    if (!loggedInCustomer) {
      // Show message if user not logged in
      setCartMessage({ [id]: "Please Register / Login first" });

      setTimeout(() => {
        setCartMessage((allCart) => {
          const updated = { ...allCart };
          delete updated[id];
          return updated;
        });
      }, 2000);
      return;
    }

    // If logged in, show normal message
    setCartMessage((allCart) => ({ ...allCart, [id]: `${name} added to cart` }));

    setTimeout(() => {
      setCartMessage((allCart) => {
        const updated = { ...allCart };
        delete updated[id];
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Products</h2>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <button
                    className="btn btn-primary btn-sm custom-btn"
                    onClick={() => addToCart(product.id, product.name)}
                  >
                    Add to Cart
                  </button>

                  <i
                    className={`fa-solid fa-heart heart-icon ${
                      liked[product.id] ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(product.id, product.name)}
                  ></i>
                </div>

                {wishlistMessage[product.id] && (
                  <div className="wishlist-message mt-2 text-success small">
                    {wishlistMessage[product.id]}
                  </div>
                )}

                {cartMessage[product.id] && (
                  <div className="cart-message mt-2 text-primary small">
                    {cartMessage[product.id]}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsGrid;
