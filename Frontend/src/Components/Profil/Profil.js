import React, { Component } from "react";
import "./Profil.css";
import axios from "axios";
import {SERVERPATH} from "../../serverParams.js";


class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: null,
    };
  }

  componentDidMount() {
    axios
      .get(SERVERPATH + "/getClient/" + encodeURI(this.props.id_cli))
      .then((response) => {
        // handle success
        this.setState({ profil: response.data[0] });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ profil: null });
      });
  }

  render() {
    let profilDiv =
      this.state.profil === null ? null : (
        <div>
          <p>{"id : " + this.props.id_cli}</p>
          <p>{"nom : " + this.state.profil.nom}</p>
          <p>{"prenom : " + this.state.profil.prenom}</p>
          <p>{"mail : " + this.state.profil.mail}</p>
          <p>{"telephone : " + this.state.profil.telephone}</p>
        </div>
      );
    return (
      <div className="main">
        <h1>Profil</h1>
        {profilDiv}
      </div>
    );
  }
}

export default Profil;
