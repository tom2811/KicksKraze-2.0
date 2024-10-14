import { Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { FaRegHeart } from "react-icons/fa6";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

export function StoreItem({ id, name, price, colorway, imgUrl }) {
  const {
    cartItems,
    getItemQuantity,
    addItemToCart,
    decreaseCartQuantity,
    removeItemFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      {/* <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "contain" }}
        className="p-4"
      /> */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LazyLoadImage
          alt={name}
          src={imgUrl}
          className="p-4 my-5"
          effect="blur"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-item-center mt-1">
          <span>{name}</span>
          <span className="ms-2 text-muted">
          <FaRegHeart className="heart-icon" style={{ cursor: "pointer"}}/>
          </span>
        </Card.Title>
        <span className="text-muted">{colorway}</span>
        <div className="mt-2">
          <span className="text-muted me-1">Last sale: </span>
          <span className="fw-bold">{formatCurrency(price)}</span>
        </div>

        <div className="mt-3">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => addItemToCart(id)}>
              + Add To Cart
            </Button>
          ) : (
            <Button
              variant="danger"
              className="w-100"
              onClick={() => removeItemFromCart(id)}
            >
              Remove
            </Button>
            //   <div
            //   className="d-flex align-items-center flex-column gap-4"
            //   style={{ gap: ".5rem" }}
            // >
            //   <div
            //     className="d-flex align-items-center justify-content-center"
            //     style={{ gap: ".5rem" }}
            //   >
            //     <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
            //     <div>
            //       <span className="fs-3">{quantity}</span> in cart
            //     </div>
            //     <Button onClick={() => addItemToCart(id)}>+</Button>
            //   </div>

            // </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}