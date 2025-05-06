import { Card, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Name from "./components/ProdName";
import Price from "./components/ProdPrice";
import Description from "./components/ProdDesc";
import product from "./product.json";


function App() {
  const firstName = "Ghada";
  return (
    <>
      <Container className="mt-5 d-flex flex-column align-items-center">
        <Card
          style={{
            width: "22rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Card.Img variant="top" src={product.image} />
          <Card.Body className="text-center">
            <Name />
            <Price />
            <Description />
          </Card.Body>
          <Card.Footer className="p-0 border-0">
            <Button
              className="w-100 rounded-0 fw-semibold"
              style={{
                background: "linear-gradient(to right, #8e44ad, #2980b9)",
                color: "white",
                padding: "0.75rem",
                fontSize: "1rem",
                borderRadius: "0 0 12px 12px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                e.target.style.border = "none";
                e.target.style.outline = "none";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
                e.target.style.border = "none";
                e.target.style.outline = "none";
              }}
            >
              Buy Now
            </Button>
          </Card.Footer>
        </Card>

        <div
          className="mt-5 text-center p-4 rounded"
          style={{
            background: "linear-gradient(to right, #8e44ad, #2980b9)",
            color: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxWidth: "400px",
          }}
        >
          <h2 className="fw-bold mb-3">
            {firstName ? `Hello, ${firstName}!` : "Hello, there!"}
          </h2>

          {firstName && (
            <img
              src="https://i.imgur.com/OYVpe2W.png"
              alt="Welcome"
              className="img-fluid"
              style={{
                width: "80px",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              }}
            />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
