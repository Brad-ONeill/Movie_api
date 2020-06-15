import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss"; //import styling

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { userProfile } = this.props;

    if (!userProfile) return null;

    return (
      <div className="profile-view">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>{user.Username}</Card.Title>
              <Card.Title>{user.Email}</Card.Title>
              <Card.Title>{user.Birthday}</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
