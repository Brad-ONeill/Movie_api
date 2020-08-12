import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

//import styling
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movieCard">
        <Card.Img className="imageCard" variant="top" src={movie.ImagePath} />
        <Card.Body className="body-main">
          <Card.Title>{movie.Title}</Card.Title>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};
