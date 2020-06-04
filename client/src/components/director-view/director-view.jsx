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
        <div class="card">
          <div class="card-header">{director.Name}</div>
          <div class="card-body">
            <div>
              <h6 class="card-subtitle text-muted">
                Born in: {director.Birth}
              </h6>
              <h6 class="card-subtitle text-muted">Died: {director.Death}</h6>
            </div>
            <div>
              <p class="card-text">{director.Bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
