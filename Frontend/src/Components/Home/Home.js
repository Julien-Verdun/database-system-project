import React, { Component } from "react";
import "./Home.css";
import RandomProposal from "../Booking/RandomProposal/RandomProposal";

class Home extends Component {
  render() {
    return (
      <div className="main">
        <h1>Projet informatique : Système de base de données</h1>
        <div className="content">
          Cette application web a été développée en ReactJS (front-end) et en
          NodeJS (back-end).
          <br />
          La base de données est une base MySQL.
          <br />
          L'application simule une plateforme de réservation de billet d'avion.
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
