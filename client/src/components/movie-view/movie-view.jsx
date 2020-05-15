import React from 'react';

import './movie-view.scss'; //import styling

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="container col-12">

                <div className="image col-sm-6 col-lg-6">
                    <img className="col-sm-12" src={movie.ImagePath} />
                </div>

                <div className="txtCont col-sm-6 col-lg-6">
                    <span className="mTitle">{movie.Title}</span>
                    <span className="label">Genre:</span>
                    <span className="bodyText">{movie.Genre.Name}</span>
                    <span className="label">Description: </span>
                    <span className="bodyText">{movie.Description}</span>
                    <span className="label">Director:</span>
                    <span className="bodyText">{movie.Director.Name}</span>
                    <div>
                        <button className="backBut" onClick={() => window.location.assign('/')} >Back to all movies</button>
                    </div>
                </div>
            </div >
        );
    }
}