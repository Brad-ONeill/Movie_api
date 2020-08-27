// src/reducers/reducers.js
import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

//Function #1
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

//Function #2
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//Combined reducer
const moviesApp = combinedreducers({
  visibilityFilter,
  movies,
});

export default moviesApp;
