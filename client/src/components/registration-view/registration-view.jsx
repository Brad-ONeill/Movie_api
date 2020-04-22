import React, { useState } from 'react';
import PropTypes from 'prop-types';

//importing scss file
import './registration-view.scss';

export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
};

return (
    <div className="registration-view">
        <Form>
            {formField('Name', name, setName)}
            {formField('Username', username, setUsername)}
            {formField('Password', password, setPassword)}
            {formField('Email', email, setEmail)}
            {formField('Birthday', birthday, setBirthday)}

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
);