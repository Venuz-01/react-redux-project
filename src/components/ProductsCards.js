import React, { useState } from "react";
import { useSelector } from "react-redux";

function ProductsGrid() {
  const products = useSelector((state) => state.products);

  
  const [liked, setLiked] = useState({});
  const [cartMessage, setCartMessage] = useState({});
  const [wishlistMessage, setWishlistMessage] = useState({});

  const toggleLike = (id, name) => {
    setLiked(allWishlist => ({ ...allWishlist, [id]: !allWishlist[id] }));

   
    if (!liked[id]) {
      setWishlistMessage({ [id]: `${name} added to wishlist ` });

      
      setTimeout(() => {
        setWishlistMessage(allWishlist => {
          const updated = { ...allWishlist };
          delete updated[id];
          return updated;
        });
      }, 2000);
    }
  };

  const addToCart = (id, name) => {
    setCartMessage(allCart => ({ ...allCart, [id]: `${name} added to cart ` }));

    setTimeout(() => {
      setCartMessage(allCart => {
        const updated = { ...allCart };
        delete updated[id];
        return updated;
      });
    }, 2000);
  };

  return (
    <div class="container my-4">
      <h2 class="mb-4 text-center">Products</h2>

      <div class="row">
        {products.map((product) => (
          <div key={product.id} class="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100">
              <img
                src={product.image}
                class="card-img-top"
                alt={product.name}
              />
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">₹{product.price}</p>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <button
                    class="btn btn-primary"
                    onClick={() => addToCart(product.id, product.name)}
                  >
                    Add to Cart
                  </button>

                  <i
                    class={`fa-solid fa-heart heart-icon ${
                      liked[product.id] ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(product.id, product.name)}
                  ></i>
                </div>

           
                {wishlistMessage[product.id] && (
                  <div class="wishlist-message mt-2 text-success small">
                    {wishlistMessage[product.id]}
                  </div>
                )}

                
                {cartMessage[product.id] && (
                  <div class="cart-message mt-2 text-primary small">
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
