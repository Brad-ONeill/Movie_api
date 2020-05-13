import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss'; //import styling

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <div className="flexbox">
                <Card className="movieCard">
                    <Card.Img className="imageCard" variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title className="cardTitle">{movie.Title}</Card.Title>
                        <Card.Text className="cardText">{movie.Description}</Card.Text>
                        <Button className="button col-8" onClick={() => onClick(movie)} variant="link">Open</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        ImagePath: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};