import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss"; //import styling

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="container col-12">
        <div className="image col-sm-6 col-lg-6">
          <img className="col-sm-12" src={movie.ImagePath} />
        </div>

        <div className="txtCont col-sm-6 col-lg-6">
          <span className="mTitle">{movie.Title}</span>

          <Button>Add to favourites</Button>
          <Button>Remove from favourites</Button>

          <span className="label">
            Genre:&nbsp;&nbsp;
            <Link to={`/movies/genre/${movie.Genre.Name}`}>
              <Button className="subBtn">
                <span className="btnText">{movie.Genre.Name}</span>
              </Button>
            </Link>
          </span>

          <span className="label">Description: </span>
          <span className="bodyText">{movie.Description}</span>
          <span className="label">
            Director:&nbsp;&nbsp;
            <Link to={`/movies/director/${movie.Director.Name}`}>
              <Button className="subBtn">
                <span className="btnText">{movie.Director.Name}</span>
              </Button>
            </Link>
          </span>

          <div>
            <Button onClick={() => window.location.assign("/movies")}>
              Back to all movies
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
