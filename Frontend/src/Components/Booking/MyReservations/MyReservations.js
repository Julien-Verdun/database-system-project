import React, { Component } from "react";
import "./MyReservations.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";

class MyReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listReservation: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/getAllReservations/" +
          encodeURI(this.props.id_cli)
      )
      .then((response) => {
        // handle success
        let listReservation = response.data.map((elt, index) => {
          return (
            <tr
              key={index}
              onClick={() => {
                this.props.history.push(
                  "/reservation/" + encodeURI(elt.id_res)
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
          listReservation: listReservation,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          listReservation: null,
        });
      });
  }

  render() {
    let table;
    if (this.state.listReservation === "") {
      table = this.state.listReservation;
    } else if (this.state.listReservation === null) {
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
              <th scope="col"></th>
              <th scope="col">Aéroport de départ</th>
              <th scope="col">Date de départ</th>
              <th scope="col">Aéroport d'arrivée</th>
              <th scope="col">Date d'arrivée</th>
              <th scope="col">Prix du vol</th>
              <th scope="col">Nombre de tickets</th>
            </tr>
          </thead>
          <tbody>{this.state.listReservation}</tbody>
        </table>
      );
    }

    return (
      <div className="main col">
        <h1>Mes réservations</h1>
        <div className="list-reservation">{table}</div>
      </div>
    );
  }
}

export default MyReservations;
