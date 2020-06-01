import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss"; //import styling

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="main-view">
        <span>
          <Container>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Title>{director.Name}</Card.Title>
                  <Card.Text>{director.Birth}</Card.Text>
                  <Card.Text>{director.Death}</Card.Text>
                  <Card.Text>{director.Bio}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </span>
      </div>
    );
  }
}
