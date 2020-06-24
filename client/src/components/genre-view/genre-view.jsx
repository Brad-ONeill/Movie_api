import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss"; //import styling

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  componentDidMount() {
    const { genre } = this.props;
  }
  render() {
    const { genre, movies } = this.props;
    const genreFilter = movies.filter((elem) => elem.Genre.Name == genre.Name);

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card>
            <Card.Header>{genre.Name}</Card.Header>

            <Card.Body>
              <Card.Text className="desc-txt">{genre.Description}</Card.Text>
              {/*more movie example*/}
              <Card className="others">
                <Card.Title>Other {genre.Name} movies</Card.Title>
                <Card.Body>
                  {genreFilter.map((m) => (
                    <div key={m._id}>
                      <img className="pre-img" src={m.ImagePath}></img>
                    </div>
                  ))}
                </Card.Body>
              </Card>
              {/*button*/}
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
