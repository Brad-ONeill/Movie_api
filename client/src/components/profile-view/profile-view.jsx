import React from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss"; //import styling

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }
  getUser(token) {
    const { userName } = this.props;
    axios
      .get("https://limitless-thicket-23479.herokuapp.com/users/" + userName, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          userProfile: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { userProfile } = this.state;

    if (!userProfile) return null;

    return (
      <div className="profile-view">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>{userProfile.Username}</Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title>{userProfile.Email}</Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title>{userProfile.Birthday}</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
