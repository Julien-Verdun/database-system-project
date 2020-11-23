import React, { Component } from "react";
import "./FlightSearch.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import { dateToDateTimeLocal } from "../../ToolsComponent/utils.js";
import { SERVERPATH } from "../../../serverParams.js";
import CircularProgress from "@material-ui/core/CircularProgress";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    let date = dateToDateTimeLocal(new Date());
    this.state = {
      flightsList: null,
      listeAirportsOptions: null,
      date_depart: date.split("T")[0],
      heure_depart: date.split("T")[1],
      id_aer_dep: null,
      id_aer_arr: null,
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
              {elt.nom + " " + elt.code + ", " + elt.ville + ", " + elt.pays}
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
        this.setState({
          listeAirportsOptions: false,
        });
      });
  }

  handleClickSearch(event) {
    event.preventDefault();
    let travelDate = this.state.date_depart;
    let departureAirportId = this.state.id_aer_dep;
    let arrivalAirportId = this.state.id_aer_arr;
    axios
      .get(
        SERVERPATH +
          "/getFlights/" +
          encodeURI(travelDate) +
          "/" +
          encodeURI(departureAirportId) +
          "/" +
          encodeURI(arrivalAirportId)
      )
      .then((response) => {
        // handle success
        if (response.data.length === 0) {
          this.setState({ flightsList: response.data });
        } else {
          let flightsList = response.data.map((elt, index) => {
            let backgroundColor = elt.nb_places_dispo === 0 ? "bisque" : null;
            return (
              <tr
                key={index}
                style={{ backgroundColor: backgroundColor }}
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
          this.setState({ flightsList: flightsList });
        }
      })
      .catch((error) => {
        // handle error
        this.setState({ flightsList: false });
      });
  }
  render() {
    let table;
    if (this.state.flightsList === null) {
      table = null;
    } else if (this.state.flightsList === false) {
      table = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else if (this.state.flightsList.length === 0) {
      table = (
        <Alerts
          type="warning"
          content="Aucun vol ne correspond à votre recherche. Essayez une autre date ou un autre voyage."
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
          <tbody>{this.state.flightsList}</tbody>
        </table>
      );
    }

    let form;
    if (this.state.listeAirportsOptions === null) {
      form = <CircularProgress />;
    } else if (this.state.listeAirportsOptions === false) {
      form = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else if (this.state.listeAirportsOptions.length === 0) {
      form = (
        <Alerts type="warning" content="Les données semblent corrompues." />
      );
    } else {
      form = (
        <div className="form-div">
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
          </form>
          <button className="btn btn-primary" onClick={this.handleClickSearch}>
            Recherche
          </button>
        </div>
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
        {form}
        <div className="table">{table}</div>
      </div>
    );
  }
}

export default FlightSearch;
