import React, { Component } from "react";
import ReactDOM from "react-dom";
import Answers from "./answer";
import Questions from "./questions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

library.add(faGripVertical);

class App extends Component {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return <Questions />;
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
