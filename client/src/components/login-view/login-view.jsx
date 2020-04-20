const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password); // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
};