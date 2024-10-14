import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";

export default function Store() {
  return (
    <>
      <h1>Store</h1>
        <Row lg={3} sm={2} xs={1} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row> 
    </>
  );
}