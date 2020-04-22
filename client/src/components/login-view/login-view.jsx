import React, { useState } from 'react'; //{useState} to preserve state between renders

//Import stylings
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState(''); //Set prop state to blank
    const [password, setPassword] = useState(''); //Set prop state to blank

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password); // Send a request to the server for authentication then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    //Return basic form
    return (
        <form className="login-form">
            <label> Username:<br />
                <input className="user-in" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <br />
            <label> Password:<br />
                <input className="password-in" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button className="login-button" type="button" onClick={handleSubmit}>Login</button>
        </form>
    );
}