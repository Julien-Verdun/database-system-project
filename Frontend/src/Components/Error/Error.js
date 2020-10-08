import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "zerzr" };
    console.log(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    // this.setState({ error: "papa" });
    this.props.history.push("/home");
  }

  render() {
    return (
      <div id="error_div">
        <h1>ERROR 404</h1>
        <h4>Sorry, the page you are looking for was not found</h4>
        <button className="btn btn-danger" onClick={this.handleClick}>
          Login
        </button>
      </div>
    );
  }
}

export default Error;
