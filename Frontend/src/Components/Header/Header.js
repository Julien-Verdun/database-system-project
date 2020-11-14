import React, { Component } from "react";
import "./Header.css";
import axios from "axios";
import { SERVERPATH } from "../../serverParams.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomClient: null,
    };
    this.getClient = this.getClient.bind(this);
  }

  getClient(id_cli) {
    axios
      .get(SERVERPATH + "/getClient/" + encodeURI(id_cli))
      .then((response) => {
        // handle success
        this.setState({ nomClient: response.data[0].prenom });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ nomClient: null });
      });
  }

  componentDidMount() {
    this.getClient(this.props.id_cli);
  }

  render() {
    let datamanagement =
      this.state.nomClient === "admin" ? (
        <div className="profil-div">
          <a href="/datamanagement">
            <button className="btn btn-warning">Management</button>
          </a>
        </div>
      ) : null;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">
          Barre de navigation
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Accueil <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/myreservations">
                Mes réservations
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/flightsearch">
                Réserver un vol
              </a>
            </li>
          </ul>
          <div className="profil-div">
            <a href="/profil">
              <AccountCircleIcon fontSize={"large"} color={"inherit"} />
            </a>
          </div>
          {datamanagement}
          <div className="profil-div">
            <button
              className="btn btn-danger"
              onClick={() => {
                console.log("Deconnexion");
                this.props.logout();
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
