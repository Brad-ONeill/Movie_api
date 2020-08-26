import React from "react";
import axios from "axios";

//
import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

// #0 import of relevant actions to be used in #2
import { setMovies } from "../../actions/actions";

//import views
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

//import routing and bootstrap
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
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
    this.setState({ user: authData.user.Username });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(autData.token);
  }

  render() {
    // #2
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router basename="/client">
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user) return;
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
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
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #4
export default connect(mapStateToProps, { setMovies })(MainView);
