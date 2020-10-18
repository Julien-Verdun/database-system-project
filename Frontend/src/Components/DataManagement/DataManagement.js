import React, { Component } from "react";
import "./DataManagement.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";
import { dateToDateTimeLocal } from "../utils.js";

class DataManagement extends Component {
  constructor(props) {
    super(props);
    let date = dateToDateTimeLocal(new Date());
    this.state = {
      new_vol: true, //mettre false
      aeroportList: null,
      allFlights: null,
      appareilsList: null,
      id_app: null,
      date_depart: date.split("T")[0],
      heure_depart: date.split("T")[1],
      date_arrivee: date.split("T")[0],
      heure_arrivee: date.split("T")[1],
      id_aer_dep: null,
      id_aer_arr: null,
      prix: 0.0,
      place_libre: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getFlights = this.getFlights.bind(this);
    this.getAirports = this.getAirports.bind(this);
    this.getAppareils = this.getAppareils.bind(this);
  }

  getFlights() {
    axios
      .get("http://localhost:8080/getAllFlights")
      .then((response) => {
        // handle success
        let allFlights = response.data.map((elt, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>
                {elt.date_depart.split("T")[0] + " à " + elt.heure_depart}
              </td>
              <td>
                {elt.date_arrivee.split("T")[0] + " à " + elt.heure_arrivee}
              </td>
              <td>{elt.prix + " €"}</td>
            </tr>
          );
        });
        this.setState({
          allFlights,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          allFlights: null,
        });
      });
  }

  getAirports() {
    axios
      .get("http://localhost:8080/getAllAirports")
      .then((response) => {
        // handle success
        let initial_id = response.data[0].id_aer;
        let aeroportList = response.data.map((elt, index) => {
          return (
            <option value={elt.id_aer} key={elt.id_aer}>
              {elt.ville + ", " + elt.pays + " - " + elt.nom}
            </option>
          );
        });
        this.setState({
          aeroportList,
          id_aer_dep: initial_id,
          id_aer_arr: initial_id,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          aeroportList: null,
        });
      });
  }

  getAppareils() {
    axios
      .get("http://localhost:8080/getAllAppareils")
      .then((response) => {
        // handle success
        let appareilsList = response.data.map((elt, index) => {
          return (
            <option value={elt.id_app} key={elt.id_app}>
              {elt.nom_compagnie +
                " - " +
                elt.type_avion +
                " (" +
                elt.type_avion +
                ")"}
            </option>
          );
        });
        this.setState({
          appareilsList,
          id_app: response.data[0].id_app,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          aeroportList: null,
        });
      });
  }

  componentDidMount() {
    // get the list of all flights
    this.getFlights();
    // get the list of all airports
    this.getAirports();
    // get the list of all apparals
    this.getAppareils();
  }

  handleClick(event) {
    event.preventDefault();
    let data = {
      id_app: this.state.id_app,
      date_depart: this.state.date_depart,
      heure_depart: this.state.heure_depart,
      date_arrivee: this.state.date_arrivee,
      heure_arrivee: this.state.heure_arrivee,
      id_aer_dep: this.state.id_aer_dep,
      id_aer_arr: this.state.id_aer_arr,
      prix: this.state.prix,
      place_libre: this.state.place_libre,
    };
    console.log(data);
    // axios
    //   .post("http://localhost:8080/addReservation", data)
    //   .then((response) => {
    //     // handle success
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log(error);
    //   });
  }

  render() {
    let flightsTable;

    if (this.state.result === "") {
      flightsTable = this.state.result;
    } else if (this.state.result === null) {
      flightsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      flightsTable = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Départ</th>
              <th scope="col">Arrivée</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>{this.state.allFlights}</tbody>
        </table>
      );
    }
    let reservation_table =
      this.state.new_vol === false ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            this.setState({ new_vol: true });
          }}
        >
          Ajouter un vol
        </button>
      ) : (
        <div className="continer">
          <div className="row">
            <form className="form-main">
              <div className="form-group">
                <label htmlFor="appareil">Type d'appareil</label>
                <select
                  className="form-control"
                  id="appareil"
                  onChange={() => {
                    this.setState({
                      id_app: document.getElementById("appareil").value,
                    });
                  }}
                >
                  {this.state.appareilsList}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="aeroport-depart-select">
                  Aéroport de départ
                </label>
                <select
                  className="form-control"
                  id="aeroport-depart-select"
                  onChange={() => {
                    this.setState({
                      id_aer_dep: document.getElementById(
                        "aeroport-depart-select"
                      ).value,
                    });
                  }}
                >
                  {this.state.aeroportList}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date-depart">Date de départ</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date-depart"
                  defaultValue={
                    this.state.date_depart + "T" + this.state.heure_depart
                  }
                  min={dateToDateTimeLocal(new Date())}
                  max={dateToDateTimeLocal(
                    new Date(new Date().getTime() + 365 * 3600 * 24 * 1000)
                  )}
                  onChange={() => {
                    let dateDepart = document
                      .getElementById("date-depart")
                      .value.split("T");
                    this.setState({
                      date_arrivee: dateDepart[0],
                      heure_arrivee: dateDepart[1],
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="aeroport-arrivee-select">
                  Aéroport d'arrivée
                </label>
                <select
                  className="form-control"
                  id="aeroport-arrivee-select"
                  onChange={() => {
                    this.setState({
                      id_aer_arr: document.getElementById(
                        "aeroport-arrivee-select"
                      ).value,
                    });
                  }}
                >
                  {this.state.aeroportList}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date-arrivee">Date d'arrivée</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date-arrivee"
                  defaultValue={
                    this.state.date_arrivee + "T" + this.state.heure_arrivee
                  }
                  min={dateToDateTimeLocal(new Date())}
                  max={dateToDateTimeLocal(
                    new Date(new Date().getTime() + 365 * 3600 * 24 * 1000)
                  )}
                  onChange={() => {
                    let dateArrivee = document
                      .getElementById("date-arrivee")
                      .value.split("T");
                    this.setState({
                      date_arrivee: dateArrivee[0],
                      heure_arrivee: dateArrivee[1],
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Prix</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  defaultValue={this.state.prix}
                  min="1"
                  max="5"
                  onChange={() => {
                    this.setState({
                      prix: document.getElementById("price").value,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nb-place">Nombre de places</label>
                <input
                  type="number"
                  className="form-control"
                  id="nb-place"
                  name="nb-place"
                  defaultValue={this.state.place_libre}
                  min="1"
                  max="5"
                  onChange={() => {
                    this.setState({
                      place_libre: document.getElementById("nb-place").value,
                    });
                  }}
                />
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handleClick}
              >
                Ajouter ce vol
              </button>
            </div>

            <div className="col">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  this.setState({ new_vol: false });
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      );

    return (
      <div className="main col">
        <h1>Les vols</h1>

        <div className="flights-table">{flightsTable}</div>

        {reservation_table}
      </div>
    );
  }
}

export default DataManagement;
