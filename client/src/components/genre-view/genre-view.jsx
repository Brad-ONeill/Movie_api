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
        <div class="card">
          <div class="card-header">{genre.Name}</div>
          <div>
            <p class="card-text">{genre.Description}</p>
          </div>
        </div>
      </div>
    );
  }
}
