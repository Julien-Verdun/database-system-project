import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    axios
      .get("http://localhost:8080/firstquery")
      .then((response) => {
        // handle success
        let coloc = response.data.map((obj) => {
          return obj;
        });
        let result = coloc.map((elt, index) => {
          return (
            <div key={index} className="row">
              <p className="col">{elt.surnom}</p>
              <p className="col">{elt.nom}</p>
              <p className="col">{elt.numero}</p>
            </div>
          );
        });
        this.setState({
          result: result,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          result: (
            <Alerts
              type="danger"
              content="Aucun résultat, vérifier votre connection"
            />
          ),
        });
      });
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
        <button className="btn btn-primary" onClick={this.handleClick}>
          Query
        </button>
        <div className="result">{this.state.result}</div>
      </div>
    );
  }
}

export default Home;
