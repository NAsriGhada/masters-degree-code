import React from "react";
import { Card } from "react-bootstrap";

const Player = ({
  name = "Unknown Player",
  team = "Unknown Team",
  nationality = "N/A",
  jerseyNumber = 0,
  age = "Unknown",
  image = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) => {
  const cardStyle = {
    margin: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  };

  return (
    <Card style={{ width: "18rem", ...cardStyle }}>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Team:</strong> {team} <br />
          <strong>Nationality:</strong> {nationality} <br />
          <strong>Jersey #:</strong> {jerseyNumber} <br />
          <strong>Age:</strong> {age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// ! Default props but deprecated in React 18+ so I used default values in the function parameters instead
// Player.defaultProps = {
//   name: "Unknown Player",
//   team: "Unknown Team",
//   nationality: "N/A",
//   jerseyNumber: 0,
//   age: "Unknown",
//   image:
//     "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

export default Player;
