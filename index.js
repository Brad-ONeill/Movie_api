const express = require('express'),
	  morgan = require('morgan'),
	  bodyParser = require('body-parser'),
	  uuid = require('uuid/v5');

const app = express();


app.use(express.static('public'));

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Oops! Sorry about that, something went wrong!');
});

// GET requests
app.get('/movies', function (req, res) {
	res.send("Successful GET request returning data about all movies.");
});

app.get('/movies/title', function (req, res) {
	res.send("Successful GET request returning data about a single movie by title.");
});

app.get('/movies/genre/genre', function (req, res) {
	res.send("Successful GET request returning data about a single movie genre by genre type.");
});

app.get('/movies/dir/name', function (req, res) {
	res.send("Successful GET request returning data about a director by name.");
});

app.post('/register/user', function (req, res) {
	res.send("Successfully registered.");
});

app.put('/update/user/id', function (req, res) {
	res.send("Successfully updated information.");
});

app.post('/favourites/id/title', function (req, res) {
	res.send("Movie successfully added to favourite.");
});

app.delete('/favourites/id/title', function (req, res) {
	res.send("Movie successfully removed from favourites.");
});

app.delete('/register/user/id', function (req, res) {
	res.send("User successfully deregistered");
});

// listening for requests
app.listen(8080, () =>
	console.log('MyFlix is listening on port 8080.')
);
