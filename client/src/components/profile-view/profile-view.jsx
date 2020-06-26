import React from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss"; //import styling
import { MovieCard } from "../movie-card/movie-card";

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
          <Card className="profile-card">
            <Card.Body>
              <Link to={`/movies`}>
                <Button className="action-btn" variant="primary">
                  Back to movies
                </Button>
              </Link>
              <Card.Title>{userProfile.Username}</Card.Title>
            </Card.Body>

            <Card.Body>
              <Card.Title>{userProfile.Email}</Card.Title>
            </Card.Body>

            <Card.Body>
              <Card.Title>{userProfile.Birthday}</Card.Title>
            </Card.Body>

            <Card.Body id="card-actions">
              <Button
                onClick={this.props.deleteProfileData}
                className="action-btn"
                id="delProfile"
                variant="danger"
                size="sm"
              >
                Delete Profile <br />
                WARNING, this action can not be reversed
              </Button>
            </Card.Body>
            <Card.Body>
              <Card.Title>
                This is a list of the user's favourite movies
              </Card.Title>
            </Card.Body>
          </Card>

          <Form className="update">
            <Form.Group controlId="formBasicUser">
              <Form.Label>Change Username</Form.Label>
              <Form.Control type="string" placeholder="New username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Change Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Update Email</Form.Label>
              <Form.Control type="email" placeholder="Update Email" />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Update Birthday</Form.Label>
              <Form.Control type="date" placeholder="Update Birthday" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
