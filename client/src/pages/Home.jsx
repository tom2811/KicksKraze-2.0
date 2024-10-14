import { Container } from "react-bootstrap";
import { SneakerModel } from "../components/SneakerModel";

export default function Home() {
  return (
    <Container
      className="pt-5 d-flex align-items-center"
      style={{height: "70vh", width: "100vw" }}
    >
      <div>
        <h2>KicksKraze</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          quaerat quas sunt qui! Nobis animi voluptates debitis, error modi
          doloremque, quos eius sed, iure quo voluptatem officia quas maxime
          inventore?
        </p>
      </div>
      <SneakerModel />
    </Container>
  );
}
