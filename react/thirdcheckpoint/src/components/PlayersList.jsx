import React from 'react'
import Player from "./Player";
import { Container, Row, Col } from "react-bootstrap";
import players from "../assets/players.json";

const PlayerList = () => {
  return (
    <Container className="mt-4">
      <Row>
        {players.map((player) => (
          <Col key={player.id} md={6} lg={4} xl={3}>
            <Player {...player} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlayerList