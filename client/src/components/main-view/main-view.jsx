import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

// #0
import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      // movies: [],
      // // selectedMovie: null,
      user: null,
      register: true,
    };
    this.deleteProfileData = this.deleteProfileData.bind(this);
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

  getMovies(token) {
    axios
      .get("https://limitless-thicket-23479.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistered() {
    this.setState({
      register: false,
      user: "user",
    });
  }

  getProfileData(token) {
    axios
      .get(`https://limitless-thicket-23479.herokuapp.com/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
        // this.setState({
        //   userProfile: response.data,
        // });
      })
      .catch(function (error) {
        alert("An error occured: " + error);
      });
  }

  deleteProfileData() {
    let token = localStorage.getItem("token");

    axios
      .delete(
        `https://limitless-thicket-23479.herokuapp.com/users/${this.state.user}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          movies: [],
          user: null,
          register: true,
          userProfile: {},
        });
      })
      .catch(function (error) {
        alert("An error occured: " + error);
      });
  }

  render() {
    // #2
    let { movies } = this.props;
    let { user } = this.state;
    const { register } = this.state;

    //console.log();

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
      <Router basename="/client">
        <Container>
          <Row>
            <div>
              <Link to={`/users/${user}`}>
                <Button>Your Profile</Button>
              </Link>
              <div>&nbsp;</div>
              <Button
                onClick={() => localStorage.clear((window.location.href = "/"))}
              >
                Logout
              </Button>
            </div>
          </Row>

          <Container>
            <div className="main-view">
              <Route
                exact
                path="/movies"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  return <MoviesList movies={movies} />;
                }}
              />

              <Route path="/register" render={() => <RegistrationView />} />

              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                )}
              />

              <Route
                exact
                path="/movies/genre/:name"
                render={({ match }) => {
                  if (!movies) return <div className="genre-view" />;
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

              <Route
                exact
                path="/movies/director/:name"
                render={(props) => {
                  if (!movies) return <div className="director-view" />;
                  return (
                    <DirectorView
                      {...props}
                      director={
                        movies.find(
                          (m) => m.Director.Name === props.match.params.name
                        ).Director
                      }
                      movies={movies}
                    />
                  );
                }}
              />

              <Route
                path="/users/:Username"
                render={({ match }) => (
                  <ProfileView
                    deleteProfileData={this.deleteProfileData}
                    userName={match.params.Username}
                  />
                )}
              />
            </div>
          </Container>
        </Container>
      </Router>
    );
  }
}

// #3
let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

// #4
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
