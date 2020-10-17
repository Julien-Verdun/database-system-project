import React, { Component } from "react";
import "./DataManagement.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class DataManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_reservation: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getFlights = this.getFlights.bind(this);
  }

  getFlights() {
    axios
      .get("http://localhost:8080/getAllFlights")
      .then((response) => {
        // handle success
        let result = response.data.map((elt, index) => {
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

  handleClick(event) {
    event.preventDefault();
    console.log("POST");
    let data = {
      id_cli: 101,
      id_vol: 101,
      prix: 25.67,
      quantite: 10,
    };
    axios
      .post("http://localhost:8080/addReservation", data)
      .then((response) => {
        // handle success
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  componentDidMount() {
    this.getFlights();
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
              <th scope="col">#</th>
              <th scope="col">Départ</th>
              <th scope="col">Arrivée</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>{this.state.result}</tbody>
        </table>
      );
    }
    let reservation_table =
      this.state.new_reservation === false ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            this.setState({ new_reservation: true });
          }}
        >
          Nouvelle réservation
        </button>
      ) : (
        <div className="continer">
          <div className="row">
            <form className="form-main">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Example select
                </label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">
                  Example multiple select
                </label>
                <select
                  multiple
                  className="form-control"
                  id="exampleFormControlSelect2"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
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
                Ajouter cette réservation
              </button>
            </div>

            <div className="col">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  this.setState({ new_reservation: false });
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
        <h1>Les réservations</h1>

        <div className="result">{table}</div>

        <div className="row">
          <div className="col">Client</div>
          <div className="col">Vol</div>
          <div className="col">Tarif</div>
          <div className="col">Quantite</div>
        </div>

        {reservation_table}
      </div>
    );
  }
}

export default DataManagement;
