import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss'; //import styling

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <cardContainer className="cardContainer">
                <Card className="movieCard">
                    <Card.Img className="imageCard" variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>>{movie.Description}</Card.Text>
                        <Button className="button" onClick={() => onClick(movie)} variant="link">Open</Button>
                    </Card.Body>
                </Card>
            </cardContainer>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        Director: PropTypes.exact({
            Name: PropTypes.string
        }),
        ImagePath: PropTypes.string,
        Genre: PropTypes.exact({
            Name: PropTypes.string,
            Description: PropTypes.string
        })
    }).isRequired,
    onClick: PropTypes.func.isRequired
};