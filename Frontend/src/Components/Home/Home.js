import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
  }

  render() {
    return (
      <div className="main">
        <h1>Bienvenue sur la page d'accueil</h1>
        <div>Contenu page d'accueil</div>
        <div className="col">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_246830.png"
            alt="home"
            width="200px"
            style={{ margin: "20px" }}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.history.push("/flightsearch");
            }}
          >
            Flight Search
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-warning"
            onClick={() => {
              this.props.history.push("/datamanagement");
            }}
          >
            Management
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
