import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push("/home");
  }

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
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Acceuil <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Link
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
                Dropdown
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
            <li className="nav-item">
              <a className="nav-link disabled" href="/home">
                Disabled
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
