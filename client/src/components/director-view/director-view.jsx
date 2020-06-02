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
      <Card>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Subtitle className="text-muted">
            Born in: {director.Birth}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            Died: {director.Death}
          </Card.Subtitle>
          <Card.Text>{director.Bio}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
