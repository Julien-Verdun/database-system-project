import React, { Component } from "react";
import "./MyReservations.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class MyReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      listeClientOptions: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeClient = this.handleChangeClient.bind(this);
    this.createSelectClients();
  }

  createSelectClients() {
    axios
      .get("http://localhost:8080/getAllClients")
      .then((response) => {
        // handle success
        let listeClientOptions = response.data.map((elt, index) => {
          return (
            <option value={elt.id_cli} key={elt.id_cli}>
              {elt.nom + " " + elt.prenom + "(" + elt.mail + ")"}
            </option>
          );
        });
        this.setState({ listeClientOptions });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ listeClientOptions: null });
      });
  }

  handleChangeClient(event) {
    event.preventDefault();
    // this.handleClick(event);
  }

  handleClick(event) {
    event.preventDefault();
    axios
      .get(
        "http://localhost:8080/getAllReservations/" +
          encodeURI(document.getElementById("inputGroupSelectClients").value)
      )
      .then((response) => {
        // handle success
        let result = response.data.map((elt, index) => {
          return (
            <tr
              key={index}
              onClick={() => {
                this.props.history.push(
                  "/reservation/" +
                    encodeURI(
                      document.getElementById("inputGroupSelectClients").value
                    ) +
                    "/" +
                    encodeURI(elt.id_res)
                );
                // console.log(elt);
              }}
            >
              <th scope="row">{index}</th>
              <td>
                {elt.aer_dep_nom +
                  " à " +
                  elt.aer_dep_ville +
                  ", " +
                  elt.aer_dep_pays}
              </td>
              <td>
                {elt.date_depart.split("T")[0] + " à " + elt.heure_depart}
              </td>
              <td>
                {elt.aer_arr_nom +
                  " à " +
                  elt.aer_arr_ville +
                  ", " +
                  elt.aer_arr_pays}
              </td>
              <td>
                {elt.date_arrivee.split("T")[0] + " à " + elt.heure_arrivee}
              </td>
              <td>{elt.prix_vol + " €"}</td>
              <td>{elt.quantite + " tickets"}</td>
            </tr>
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
          result: null,
        });
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
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Aéroport de départ</th>
              <th scope="col">Date de départ</th>
              <th scope="col">Aéroport d'arrivée</th>
              <th scope="col">Date d'arrivée</th>
              <th scope="col">Prix du vol</th>
              <th scope="col">Nombre de tickets</th>
            </tr>
          </thead>
          <tbody>{this.state.result}</tbody>
        </table>
      );
    }

    return (
      <div className="main col">
        <h1>Mes réservations</h1>
        <div className="input-group input-client">
          <select
            className="custom-select"
            id="inputGroupSelectClients"
            onChange={this.handleChangeClient}
          >
            {this.state.listeClientOptions}

            {/* <option defaultValue value="0">
              Utilisateur...
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={this.handleClick}
            >
              Afficher mes réservations
            </button>
          </div>
        </div>
        <div className="result">{table}</div>
      </div>
    );
  }
}

export default MyReservations;
