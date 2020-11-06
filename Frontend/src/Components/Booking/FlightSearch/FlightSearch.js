import React, { Component } from "react";
import "./FlightSearch.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import { dateToDateTimeLocal } from "../../ToolsComponent/utils.js";
import { SERVERPATH } from "../../../serverParams.js";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    let date = dateToDateTimeLocal(new Date());
    this.state = {
      result: "",
      listeAirportsOptions: null,
      date_depart: date.split("T")[0],
      heure_depart: date.split("T")[1],
      id_aer_dep: null,
      id_aer_arr: null,
      nb_places: null,
      hasError: false,
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
        let initial_id = response.data[0].id_aer;
        let listeAirportsOptions = response.data.map((elt, index) => {
          return (
            <option value={elt.id_aer} key={elt.id_aer}>
              {elt.nom}
            </option>
          );
        });
        this.setState({
          listeAirportsOptions,
          id_aer_dep: initial_id,
          id_aer_arr: initial_id,
        });
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
    let travelDate = this.state.date_depart;
    let departureAirportId = this.state.id_aer_dep;
    let arrivalAirportId = this.state.id_aer_arr;
    let nbPassengers = this.state.nb_places;
    if (nbPassengers <= 0) {
      this.setState({ hasError: true });
    } else {
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
          if (response.data.length === 0) {
            this.setState({ result: "Pas de résultats" });
          } else {
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
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
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
    } else if (this.state.result === "Pas de résultats") {
      table = (
        <div className="alert alert-warning">
          <strong>Attention !</strong> Aucuns vols ne correspondent à vos
          critères. Essayez une autre date ou un autre voyage.
        </div>
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
        <div>Entrez ci-dessous vos critères de recherche. Bon voyage !</div>
        <div className="col">
          <img
            src="https://st3.depositphotos.com/1000193/12754/v/450/depositphotos_127545178-stock-illustration-search-airplane-pictogram.jpg"
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
              type="datetime-local"
              id="departure-input"
              placeholder="Enter a departure date"
              defaultValue={
                this.state.date_depart + "T" + this.state.heure_depart
              }
              min={dateToDateTimeLocal(new Date())}
              max={dateToDateTimeLocal(
                new Date(new Date().getTime() + 365 * 3600 * 24 * 1000)
              )}
              onChange={() => {
                let dateDepart = document
                  .getElementById("departure-input")
                  .value.split("T");
                this.setState({
                  date_depart: dateDepart[0],
                  heure_depart: dateDepart[1],
                });
              }}
            ></input>
          </div>
          <div className="form-group">
            <label>Depuis </label>
            <select
              name="from-airports"
              id="from-airport"
              className="custom-select"
              onChange={() => {
                this.setState({
                  id_aer_dep: Number(
                    document.getElementById("from-airport").value
                  ),
                });
              }}
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
              onChange={() => {
                this.setState({
                  id_aer_arr: Number(
                    document.getElementById("to-airport").value
                  ),
                });
              }}
            >
              {this.state.listeAirportsOptions}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre de passagers </label>
            <input
              className="form-control"
              type="number"
              id="nb-passengers-input"
              placeholder="0"
              min="1"
              max="20"
              onChange={() => {
                this.setState({
                  nb_places: Number(
                    document.getElementById("nb-passengers-input").value
                  ),
                });
              }}
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
