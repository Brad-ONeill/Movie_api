const mongoose = require('mongoose');
const Models = require('./js/models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid/v5');

const app = express();

mongoose.connect('mongodb://localhost:27017/myflixdb', {
    useNewUrlParser: true
});

app.use(express.static('public'));

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops! Sorry about that, something went wrong!');
});

// --- app requests ---

// Get all movies
app.get('/movies', function (req, res) {
    Movies.find()
        .then(function (movies) {
            res.json(movies)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get a movie by title
app.get('/movies/:Title', function (req, res) {
    Movies.findOne({
            Title: req.params.Title
        })
        .then(function (movie) {
            res.json(movie)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//Get genre by name
//NOT CURRENTLY WORKING
app.get('/movies/genre/:Name', function (req, res) {
    Movies.findOne({
            "Genre.Name": req.params.Name
        })
        .then(function (movies) {
            res.json(movies.genre);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get all users
app.get('/users', function (req, res) {
    Users.find()
        .then(function (users) {
            res.status(201).json(users)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get a user by Username
app.get('/users/:Username', function (req, res) {
    Users.findOne({
            Username: req.params.Username
        })
        .then(function (user) {
            res.json(user)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get director by name
app.get('/movies/director/:Name', function (req, res) {
    Movies.findOne({
            "Director.Name": req.params.Name
        })
        .then(function (movies) {
            res.json(movies.Director);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Add new user
app.post('/users', function (req, res) {
    Users.findOne({
            Username: req.body.Username
        })
        .then(function (user) {
            if (user) {
                return res.status(400).send(req.body.Username + "already exists");
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then(function (user) {
                        res.status(201).json(user)
                    })
                    .catch(function (error) {
                        console.error(error);
                        res.status(500).send("Error: " + error);
                    })
            }
        }).catch(function (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});


// Update user
app.put('/users/:Username', function (req, res) {
    Users.findOneAndUpdate({
            Username: req.params.Username
        }, {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        }, {
            new: true
        },
        // This line makes sure that the updated document is returned
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser)
            }
        })
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:_id', function (req, res) {
    Users.findOneAndUpdate({
            Username: req.params.Username
        }, {
            $push: {
                FavouriteMovies: req.params._id
            }
        }, {
            new: true
        },
        // This line makes sure that the updated document is returned
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser)
            }
        })
});

// remove movie from user favourite
app.delete('/users/:Username/Movies/:_id', function (req, res) {
    Users.findOneAndUpdate({
            Username: req.params.Username
        }, {
            $pull: {
                FavouriteMovies: req.params._id
            }
        }, {
            new: true
        },
        // This line makes sure that the updated document is returned
        function (err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

// Delete a user by Username
app.delete('/users/:Username', function (req, res) {
    Users.findOneAndRemove({
            Username: req.params.Username
        })
        .then(function (user) {
            if (!user) {
                res.status(400).send(req.params.Username + " was not found");
            } else {
                res.status(200).send(req.params.Username + " was deleted.");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});
// listening for requests
app.listen(8080, () =>
    console.log('MyFlix is ready to rock on port 8080.')
);
