import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss"; //import styling

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="main-view">
        <span>
          <Container>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Title>{genre.Name}</Card.Title>
                  <Card.Title>{genre.Description}</Card.Title>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </span>
      </div>
    );
  }
}
