import React, { Component } from "react";
import "./Login.css";
import isAuthorise from "./Auth";
import Footer from "../Footer/Footer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      console.log("Veuillez saisir des données");
    } else {
      console.log("Submit connection form");
      isAuthorise(this.state.email, this.state.password).then((value) => {
        this.props.authentification(value[0], value[1]);
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    return (
      <div>
        <div className="login-div">
          <h4>Se connecter</h4>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Addresse mail</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Renseigner votre mail (superuser@admin, maxime.peter@ecl17.ec-lyon.fr, julien.verdun@ecl17.ec-lyon.fr)"
                onChange={this.handleClick}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                Mot de passe ( sbdappmdp** )
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Mot de passe (sbdappmdp**)"
                onChange={this.handleClick}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Soumettre
            </button>
          </form>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Login;
