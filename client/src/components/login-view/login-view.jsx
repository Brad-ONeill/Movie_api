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
        <form>
            <label> Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label> Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Login</button>
        </form>
    );
}