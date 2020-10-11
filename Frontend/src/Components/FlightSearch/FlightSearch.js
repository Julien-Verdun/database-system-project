import React, { Component } from "react";
import "./FlightSearch.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class FlightSearch extends Component {
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
        <h1>Bienvenue sur la page de recherche</h1>
        <div>Blabla</div>
        <div className="col">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_246830.png"
            alt="home"
            width="200px"
            style={{ margin: "20px" }}
          />
        </div>
        <form>
          <div className="form-group">
            <label>Departure date</label>
            <input className="form-control" id="departure-input" placeholder="Enter a departure date"></input>
            <small className="form-text text-muted">Please enter the date in the format YYYY:MM:DD</small>
          </div>
        </form>
        <div className="container">
          <div className="row justify-content-md-center" id ="test">
            <div className="col">
              <button className="btn btn-primary" onClick={this.handleClick}>
                Query
              </button>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col">
              <button className="btn btn-primary" onClick={() => {this.props.history.push('/home')}}>
                Home Page
              </button>
          </div>
        </div>
        </div>
        <div className="result">{this.state.result}</div>
      </div>
    );
  }
}

export default FlightSearch;
