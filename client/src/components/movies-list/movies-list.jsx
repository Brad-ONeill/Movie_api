import React from "react";
import { connect } from "react-redux";

import visibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((movie) =>
      movie.Title.includes(visibilityFilter)
    );
  }

  if (!movies) return <div className="main-view" />;

  return;
  <div className="movies-list">
    <visibilityFilterInput visibilityFilter={visibilityFilter} />

    {filteredMovies.map((movie) => (
      <MovieCard key={movie._id} movie={movie} />
    ))}
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
