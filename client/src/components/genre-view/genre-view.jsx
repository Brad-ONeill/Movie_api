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
      <div className="genre-view">
        <Container>
          <Card>
            <Card.Header>{genre.Name}</Card.Header>

            <Card.Body>
              <Card.Text>{genre.Description}</Card.Text>
              <Link to={`/movies`}>
                <Button variant="link">Back to all movies</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
