import { Container, Navbar, Card } from "react-bootstrap";

function App() {
  return (
    <>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">My React App</Navbar.Brand>
        </Navbar>

        <Container className="mt-4">
          <h1>Welcome to React + Bootstrap</h1>

          <div className="d-flex justify-content-around mt-4">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card 1</Card.Title>
                <Card.Text>This is the first card.</Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>This is the second card.</Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card 3</Card.Title>
                <Card.Text>This is the third card.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
