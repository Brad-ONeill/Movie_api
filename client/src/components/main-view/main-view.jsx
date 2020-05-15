import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

//styles and elemetns
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null, //user default prop should be set to null (logged out)
            register: true
        };
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegistered() {
        this.setState({
            register: false,
            user: 'user'
        });
    }

    getMovies(token) {
        axios.get('https://limitless-thicket-23479.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    /*componentDidMount() {
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
    }*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!user) return <LoginView register={() => this.onRegistered()} onLoggedIn={user => this.onLoggedIn(user)} />;
        if (!movies) return <div className="main-view" />;
        if (!register) return <RegistrationView onRegistered={this.onRegistered} />

        return (
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
        );
    }
}
