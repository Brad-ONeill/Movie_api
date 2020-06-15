import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./director-view.scss"; //import styling

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
            </Card.Body>

            <Card.Body>
              <Card.Text className="col-6 text-muted">
                Born in: {director.Birth}
              </Card.Text>

              <Card.Text className="col-6 text-muted">
                Died in: {director.Death}
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Text>Director Bio: {director.Bio}</Card.Text>

              <Link to={`/movies`}>
                <Button variant="link">Back to all movies</Button>
              </Link>
            </Card.Body>
          </Card>
          <Container>This is where the related movies will be shown</Container>
        </Container>
      </div>
    );
  }
}
