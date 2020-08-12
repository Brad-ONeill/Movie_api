import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      movies: [],
      // selectedMovie: null,
      user: null,
      register: true,
      userProfile: {},
    };
    this.deleteProfileData = this.deleteProfileData.bind(this);
  }

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

  getProfileData(token) {
    axios
      .get(`https://limitless-thicket-23479.herokuapp.com/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("res=====", response);
        this.setState({
          userProfile: response.data,
        });
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
        console.log("res=====", response);
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

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getProfileData(accessToken);
    }
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

  render() {
    const { movies, user, register, userProfile } = this.state;

    if (!user)
      return (
        <LoginView
          register={() => this.onRegistered()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );
    if (!movies) return <div className="main-view" />;
    if (!register) return <RegistrationView onRegistered={this.onRegistered} />;
    console.log(user);
    return (
      <Router>
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
                render={() =>
                  movies.map((m) => <MovieCard key={m._id} movie={m} />)
                }
              />

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

/*

 favourites={movies.filter((movie) => {
                      return userProfile.FavouriteMovies.includes(movie._id);
                    })}

*/
