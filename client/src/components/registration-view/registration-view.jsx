import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistered({ username, password, email, birthday });
    };

    return (
        <Container>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} className="col-12 col-sm-12 col-md-6" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Group as={Col} className="col-12 col-sm-12 col-md-6" controlId="password" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" />
                    </Form.Group >
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} className="col-12 col-sm-12 col-md-6" controlId="birthday">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="13/05/2020" />
                    </Form.Group>

                    <Form.Group as={Col} className="col-12 col-sm-12 col-md-6" controlId="email" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                        <Form.Text className="text-muted"> We won't share your info or contact you</Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="checkbox" >
                    <Form.Check type="checkbox" label="Check this box to confirm your details are correct" />
                </Form.Group>

                <Button varient="primary" type="submit" > Submit</Button >

            </Form >
        </Container>
    );
}