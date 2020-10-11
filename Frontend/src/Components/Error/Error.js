import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div id="error_div">
        <h1>ERREUR 404</h1>
        <h3>Désolé, la page que vous recherchez est introuvable</h3>
        <div className="col">
          <img
            src="https://www.hostinger.fr/assets/lang/fr/images/404-3a53e76ef1.png"
            alt="error"
            width="400px"
          />
        </div>
        <div className="col">
          <button className="btn btn-danger" onClick={this.handleClick}>
            Accueil
          </button>
        </div>
      </div>
    );
  }
}

export default Error;
