import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

//styles and elemetns
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null, //user default prop should be set to null (logged out)
      register: true, //not in exercise as it's improvised logic
    };
  }

  /* onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    } */

  onRegistered() {
    this.setState({
      register: false,
      user: "user",
    });
  }

  getMovies(token) {
    axios
      .get("https://limitless-thicket-23479.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /* componentDidMount() {
        axios.get('https://limitless-thicket-23479.herokuapp.com/movies')
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    } */

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, selectedMovie, user, register, director } = this.state;

    if (!user)
      return (
        <LoginView
          register={() => this.onRegistered()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );
    if (!movies) return <div className="main-view" />;
    if (!register) return <RegistrationView onRegistered={this.onRegistered} />;

    return (
      <Container>
        <Row>
          <Col>
            <Button href={`/users/${user}`}>
              <span>Your Profile</span>{" "}
            </Button>
            <Button href={`/movies`}>
              <span>All Movies</span>{" "}
            </Button>
            <Button
              onClick={() => localStorage.clear(window.location.reload())}
            >
              Logout
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Router>
              <div className="main-view">
                {/* Movie Cards */}
                <Route
                  exact
                  path="/movies"
                  render={() =>
                    movies.map((m) => <MovieCard key={m._id} movie={m} />)
                  }
                />

                {/* Movie view */}
                <Route
                  path="/movies/:movieId"
                  render={({ match }) => (
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  )}
                />

                {/* Genre view */}
                <Route
                  exact
                  path="/movies/genre/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return (
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        movies={movies}
                      />
                    );
                  }}
                />
                {/* Director view */}
                <Route
                  exact
                  path="/movies/director/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return (
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        movies={movies}
                      />
                    );
                  }}
                />

                {/* Profile view */}
                <Route
                  path="users/:Username"
                  render={() => {
                    if (!userProfile) return <div className="main-view" />;
                    return (
                      <ProfileView userProfile={userProfile} user={user} />
                    );
                  }}
                />
              </div>
            </Router>
          </Col>
        </Row>
      </Container>
    );

    /* return (
             <div>
                 <div className="main-view">
                     {selectedMovie
                         ? <MovieView movie={selectedMovie} />
                         : movies.map(movie => (
                             <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                         ))
                     }
                 </div>
                 <div>
                     <Button onClick={() => localStorage.clear(window.location.reload())}>
                         Logout
                     </Button>
                 </div>
             </div>
         ); */
  }
}
