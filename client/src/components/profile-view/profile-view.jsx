import React from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
    console.log(this.props);

    const { userProfile } = this.state;

    if (!userProfile) return null;

    return (
      <div className="profile-view">
        <Container>
          <Card id="profile-card">
            <Card.Body>
              <Card.Title>{userProfile.Username}</Card.Title>
            </Card.Body>
            Update Username
            <br /> Update password
            <Card.Body>
              <Card.Title>{userProfile.Email}</Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title>{userProfile.Birthday}</Card.Title>
            </Card.Body>
            Update birthday
            <Card.Body id="card-actions">
              <Button className="action-btn" variant="primary" block>
                Save changes
              </Button>
              <Link to={`/movies`}>
                <Button className="action-btn" variant="primary" block>
                  Back to movies
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Container>This is a list of the user's favourite movies</Container>
          <Container>
            <div>
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
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}
