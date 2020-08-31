import React, { useState } from "react";
import axios from "axios";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

//Import stylings
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://limitless-thicket-23479.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // '_self' is necessary to open the page in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group
            as={Col}
            className="col-12 col-sm-12 col-md-6"
            controlId="username"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => createUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-12 col-sm-12 col-md-6"
            controlId="password"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => createPassword(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            className="col-12 col-sm-12 col-md-6"
            controlId="birthday"
          >
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="13/05/2020"
              value={birthday}
              onChange={(e) => createBirthday(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-12 col-sm-12 col-md-6"
            controlId="email"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => createEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              {" "}
              We won't share your info or contact you
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Button varient="primary" type="submit" onClick={handleSubmit}>
          {" "}
          Submit
        </Button>
      </Form>
    </Container>
  );
}
