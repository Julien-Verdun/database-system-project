import React, { Component } from "react";
import "./Header.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class Header extends Component {
  render() {
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/home"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Réserver
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/home">
                  Action
                </a>
                <a className="dropdown-item" href="/home">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/home">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <div>
            <a href="/profil">
              <AccountCircleIcon />
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
