import React, { Component } from "react";
import "./Login.css";
import isAuthorise from "./Auth";
import Footer from "../Footer/Footer";
import Alerts from "../ToolsComponent/Alerts/Alerts";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorConnection: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ errorConnection: true });
    } else {
      isAuthorise(this.state.email, this.state.password).then((value) => {
        if (!value[0]) {
          this.setState({ errorConnection: true });
        }
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
    let errorConnection = this.state.errorConnection ? (
      <Alerts
        type="danger"
        content="Les identifiants fournies ne sont pas les bons."
      />
    ) : null;
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
            {errorConnection}
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
