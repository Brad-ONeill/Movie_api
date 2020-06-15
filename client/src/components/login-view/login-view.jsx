import React, { useState } from "react"; //{useState} to preserve state between renders
import axios from "axios";

//Import stylings
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState(""); //Set prop state to blank
  const [password, setPassword] = useState(""); //Set prop state to blank

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://limitless-thicket-23479.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("This user does not exist");
      });
  };
  //console.log(username, password);
  //props.onLoggedIn(username);

  //Return basic form
  return (
    <form className="login-form">
      <label>
        {" "}
        Username:
        <br />
        <input
          className="user-in"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        {" "}
        Password:
        <br />
        <input
          className="password-in"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="login-button" type="submit" onClick={handleSubmit}>
        Login
      </button>
      <button className="login-button" type="button" onClick={props.register}>
        Register
      </button>
    </form>
  );
}
