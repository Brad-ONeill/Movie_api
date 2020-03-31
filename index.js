//Dependancies
const
    mongoose = require('mongoose');
const
    Models = require('./models.js');
const
    passport = require('passport');
require('./passport');
const
    Movies = Models.Movie;
const
    Users = Models.User;
const
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid/v5');
const
    app = express();
const
    cors = require('cors');
const {
    check,
    validationResult
} = require('express-validator');



mongoose.connect('process.env.CONNECTION_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/*mongoose.connect('mongodb://localhost:27017/myflixdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

//Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

var allowedOrigins = ['*'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
            var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

var auth = require('./auth')(app);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops! Sorry about that, something went wrong!');
});

// --- app requests ---

// Get all movies
app.get('/movies', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Movies.find()
        .then(function (movies) {
            res.status(201).json(movies)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get a movie by title
app.get('/movies/:Title', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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

// Get all users
app.get('/users', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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
app.get('/users/:Username', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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

//Get genre by name
app.get('/movies/genre/:Name', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Movies.findOne({
            "Genre.Name": req.params.Name
        })
        .then(function (movies) {
            res.json(movies.Genre);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Get director by name
app.get('/movies/director/:Name', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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
app.post('/users', [check('Username', 'Username is required').isLength({
        min: 5
    }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()], function (req, res) {

    //check for validation object errors
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({
            Username: req.body.Username
        })
        .then(function (user) {
            if (user) {
                return res.status(400).send(req.body.Username + " already exists");
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
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
app.put('/users/:Username', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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

// Delete a user by Username
app.delete('/users/:Username', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:_id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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

// Remove movie from user favourite
app.delete('/users/:Username/movies/:_id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
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


// listening for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
    console.log(`Listening on Port ${port}`);
});
