import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button } from "react-bootstrap";

export function CartItem({ id, quantity }) {
  const { cartItems, getItemQuantity, addItemToCart, decreaseCartQuantity ,removeItemFromCart } =
  useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center me-2"
      >
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "contain" }}
          className="p-2"
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            <div className="d-flex align-items-center">
              <button onClick={() => decreaseCartQuantity(id)} style={{border: 'none'}}>-</button>
              <span style={{width: '60px', textAlign: 'center'}}>{quantity}</span>
              <button onClick={() => addItemToCart(id)} style={{border: 'none'}}>+</button>
            </div>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeItemFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
      <hr></hr>
    </>
  );
}