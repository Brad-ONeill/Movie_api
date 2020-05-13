import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createBirthday] = useState('');
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistered(username);
};

return (
    <Container>
        <Form >

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>


            <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
                <Form.Text className="text-muted"> We won't share your info or contact you</Form.Text>
            </Form.Group >

            <Form.Group controlId="formBasicBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" placeholder="13/05/2020" />
            </Form.Group>


            <Form.Group controlId="formBasicPassword" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group >


            <Form.Group controlId="formBasicCheckbox" >
                <Form.Check type="checkbox" label="click this for reasons" />
            </Form.Group >


            <Button varient="primary" type="submit" > Submit</Button >

        </Form >
    </Container>
);
