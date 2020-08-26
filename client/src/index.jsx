// client/src/index.jsx
import React from "react";
import ReactDOM from "react-dom";

//importing react and react-redux
import { createStore } from "redux";
import { Provider } from "react-redux";

import MainView from "./components/main-view/main-view";

//importing reducer file
import moviesApp from "./reducers/reducers";

// Import statement to indicate that we need to bundle `./index.scss`
import "./index.scss";

// Creating store to wrap the entire app in a provider
const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
