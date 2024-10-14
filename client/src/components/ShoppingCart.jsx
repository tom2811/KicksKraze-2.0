import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Stack,
} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { StoreItem } from "./StoreItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>Cart</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {cartItems.length > 0 ? <div className="ms-auto fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div> : <div className="d-flex justify-content-center">Your cart is empty</div>}
          
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
}
