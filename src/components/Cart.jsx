import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  // console.log("my cart", cart);
  return (
    <>
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-light my-5 rounded-4"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start", 
              alignItems: "center",
              gap: "20px", 
            }}
          >
            {/* Image on the left */}
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt="Product Image"
                style={{
                  width: "150px",
                  height: "auto",
                  margin: "10px",
                  marginRight:"50px",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* Product details and actions */}
            <div className="cart_des">
              <h4>{product.title}</h4>
              <h5>Price: {product.price}/-</h5>
              <h5>Quantity: {product.qty}</h5>
              {/* Action Buttons */}
              <div className="cart_action mt-3">
                <button
                  className="btn btn-warning mx-1"
                  style={{ fontWeight: "bold" }}
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  ➖
                </button>
                <button
                  className="btn btn-info mx-1"
                  style={{ fontWeight: "bold" }}
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  ➕
                </button>
                <button
                  className="btn btn-danger mx-1"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    if (confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
