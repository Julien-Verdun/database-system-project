import React, { Component } from "react";
import "./FlightSearch.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import { SERVERPATH } from "../../../serverParams.js";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      listeAirportsOptions: null,
    };
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }
  componentDidMount() {
    this.createSelectAirports();
  }
  createSelectAirports() {
    axios
      .get(SERVERPATH + "/getAllAirports")
      .then((response) => {
        // handle success
        console.log(response);
        let listeAirportsOptions = response.data.map((elt, index) => {
          return (
            <option value={elt.id_aer} key={elt.id_aer}>
              {elt.nom}
            </option>
          );
        });
        this.setState({ listeAirportsOptions });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ listeAirportsOptions: null });
      });
  }

  handleClickSearch(event) {
    event.preventDefault();
    console.log("Search");
    let travelDate = encodeURI(
      document.getElementById("departure-input").value
    );
    let departureAirportId = encodeURI(
      document.getElementById("from-airport").value
    );
    let arrivalAirportId = encodeURI(
      document.getElementById("to-airport").value
    );
    let nbPassengers = encodeURI(
      document.getElementById("nb-passengers-input").value
    );
    axios
      .get(
        SERVERPATH +
          "/getFlights/" +
          encodeURI(travelDate) +
          "/" +
          encodeURI(departureAirportId) +
          "/" +
          encodeURI(arrivalAirportId) +
          "/" +
          encodeURI(nbPassengers)
      )
      .then((response) => {
        // handle success
        let flightsList = response.data.map((elt, index) => {
          return (
            <tr
              key={index}
              onClick={() => {
                this.props.history.push(
                  "/flightbooking/" + encodeURI(elt.id_vol)
                );
              }}
            >
              <th scope="row">{index}</th>
              <td>{elt.date_depart + " à " + elt.heure_depart}</td>
              <td>{elt.aeroport_depart}</td>
              <td>{elt.date_arrivee + " à " + elt.heure_arrivee}</td>
              <td>{elt.aeroport_arrivee}</td>
              <td>{elt.prix + " €"}</td>
            </tr>
          );
        });
        this.setState({ result: flightsList });
      });
  }
  render() {
    let table;

    if (this.state.result === "") {
      table = this.state.result;
    } else if (this.state.result === null) {
      table = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Date d'arrivée</th>
              <th scope="col">Aéroport de départ</th>
              <th scope="col">Date d'arrivée</th>
              <th scope="col">Aéroport d'arrivée</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>{this.state.result}</tbody>
        </table>
      );
    }
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
            <label>Date de départ</label>
            <input
              className="form-control"
              id="departure-input"
              placeholder="Enter a departure date"
            ></input>
            <small className="form-text text-muted">
              Entrez la date sous le format YYYY-MM-DD
            </small>
          </div>
          <div className="form-group">
            <label>Depuis </label>
            <select
              name="from-airports"
              id="from-airport"
              className="custom-select"
            >
              {this.state.listeAirportsOptions}
            </select>
          </div>
          <div className="form-group">
            <label>Vers </label>
            <select
              name="to-airports"
              id="to-airport"
              className="custom-select"
            >
              {this.state.listeAirportsOptions}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre de passagers </label>
            <input
              className="form-control"
              id="nb-passengers-input"
              placeholder="Enter the number of passengers"
            ></input>
          </div>
        </form>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={this.handleClickSearch}
              >
                Recherche
              </button>
            </div>
          </div>
        </div>
        <div className="result">{table}</div>
      </div>
    );
  }
}

export default FlightSearch;
