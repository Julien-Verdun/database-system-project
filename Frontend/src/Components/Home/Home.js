import React, { Component } from "react";
import "./Home.css";
import RandomProposal from "../Booking/RandomProposal/RandomProposal";

class Home extends Component {
  render() {
    return (
      <div className="main">
        <h1>Plateforme de réservation</h1>
        <div className="content">
          Bienvenu sur votre plateforme de réservation de billet d'avion.
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.history.push("/flightsearch");
              }}
            >
              Réserver un vol
            </button>
          </div>
        </div>
        <RandomProposal nbProposal={4} {...this.props} />
      </div>
    );
  }
}

export default Home;
