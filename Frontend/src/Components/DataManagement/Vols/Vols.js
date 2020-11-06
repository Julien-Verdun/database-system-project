import React, { Component } from "react";
import "./Vols.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import Table from "../../ToolsComponent/Table/Table";
import { dateToDateTimeLocal } from "../../ToolsComponent/utils.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { SERVERPATH } from "../../../serverParams.js";
import { reverseDate } from "./../../ToolsComponent/utils";
import Modal from "../../ToolsComponent/Modal/Modal";

class Vols extends Component {
  constructor(props) {
    super(props);
    let date = dateToDateTimeLocal(new Date());
    this.state = {
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
      prix: null,
      place_libre: null,
      hasError: false,
      modalVolContent: "",
      idVolToRemove: null,
    };
    this.handleAddVol = this.handleAddVol.bind(this);
    this.getFlights = this.getFlights.bind(this);
    this.getAirports = this.getAirports.bind(this);
    this.getAppareils = this.getAppareils.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
    this.handleDeleteVol = this.handleDeleteVol.bind(this);
  }

  getFlights() {
    axios
      .get(SERVERPATH + "/getAllFlights")
      .then((response) => {
        // handle success
        let allFlights = response.data.map((elt, index) => {
          let backgroundColor =
            new Date(reverseDate(elt.date_depart)) < new Date()
              ? "bisque"
              : null;

          return (
            <tr key={index} style={{ backgroundColor: backgroundColor }}>
              <th scope="row">{index}</th>
              <td>
                {elt.date_depart +
                  " à " +
                  elt.heure_depart +
                  " de " +
                  elt.aer_dep_nom}
              </td>
              <td>
                {elt.date_arrivee +
                  " à " +
                  elt.heure_arrivee +
                  " de " +
                  elt.aer_arr_nom}
              </td>
              <td>{elt.prix + " €"}</td>
              <td>{elt.place_libre}</td>
              <td>
                <DeleteIcon
                  data-toggle="modal"
                  data-target="#remove-vol-modal"
                  onClick={() => {
                    this.setState({
                      idVolToRemove: elt.id_vol,
                      modalVolContent: (
                        <div className="col">
                          <div className="raw modal-div">
                            {"Vous vous apprêtez à supprimer le vol du " +
                              elt.date_depart +
                              " à " +
                              elt.heure_depart +
                              " au départ de : "}
                            <p className="bold-p">
                              {elt.aer_dep_nom + ", " + elt.aer_dep_pays}
                            </p>
                            {"à destination de : "}
                            <p className="bold-p">
                              {elt.aer_arr_nom + ", " + elt.aer_arr_pays + "."}
                            </p>
                          </div>
                          <div className="raw modal-div">
                            {"Cette opération est irréversible."}
                          </div>
                          <div className="raw modal-div">
                            {" "}
                            &Ecirc;tes-vous sûr de vouloir continuer ?
                          </div>
                        </div>
                      ),
                    });
                  }}
                />
              </td>
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
      .get(SERVERPATH + "/getAllAirports")
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
      .get(SERVERPATH + "/getAllAppareils")
      .then((response) => {
        // handle success
        let appareilsList = response.data.map((elt, index) => {
          return (
            <option value={elt.id_app} key={elt.id_app}>
              {elt.nom_compagnie +
                " - " +
                elt.type_avion +
                " (" +
                elt.nb_place +
                " places)"}
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
    console.log("VOLS PAGE LOADED");
  }

  resetInputs() {
    let date = dateToDateTimeLocal(new Date());

    document.getElementById("price").value = 0.0;
    document.getElementById("nb-place-vol").value = 0;
    document.getElementById("date-depart").value = date;
    document.getElementById("date-arrivee").value = date;

    this.setState({
      prix: null,
      place_libre: null,
      date_depart: date.split("T")[0],
      heure_depart: date.split("T")[1],
      date_arrivee: date.split("T")[0],
      heure_arrivee: date.split("T")[1],
    });
  }

  handleDeleteVol(id_vol) {
    let data = {
      id_vol: id_vol,
    };

    axios
      .post(SERVERPATH + "/deleteVol", data)
      .then((response) => {
        // handle success
        console.log(response);
        this.getFlights();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleAddVol(event) {
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
    if (
      new Date(data.date_depart + "T" + data.heure_depart) >=
        new Date(data.date_arrivee + "T" + data.heure_arrivee) ||
      data.id_aer_dep === data.id_aer_arr ||
      data.prix === null ||
      data.prix < 0 ||
      data.place_libre === null ||
      data.place_libre < 0
    ) {
      this.setState({ hasError: true });
    } else {
      axios
        .post(SERVERPATH + "/addVol", data)
        .then((response) => {
          this.setState({ hasError: false });
          // handle success
          this.getFlights();
          this.resetInputs();
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  render() {
    let flightsTable;

    if (this.state.allFlights === null) {
      flightsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      flightsTable = (
        <Table
          listHeaders={[
            "Départ",
            "Arrivée",
            "Prix",
            "Place libre",
            "Supprimer",
          ]}
          listItems={this.state.allFlights}
        />
      );
    }
    let reservation_table = (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Ajouter un vol</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form className="form-main">
              <div className="form-group">
                <label htmlFor="appareil">Type d'appareil</label>
                <select
                  className="form-control"
                  id="appareil"
                  onChange={() => {
                    this.setState({
                      id_app: Number(document.getElementById("appareil").value),
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
                      id_aer_dep: Number(
                        document.getElementById("aeroport-depart-select").value
                      ),
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
                      date_depart: dateDepart[0],
                      heure_depart: dateDepart[1],
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
                      id_aer_arr: Number(
                        document.getElementById("aeroport-arrivee-select").value
                      ),
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
                  placeholder="0.0"
                  min="1"
                  max="5"
                  onChange={() => {
                    this.setState({
                      prix: Number(document.getElementById("price").value),
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nb-place-vol">Nombre de places</label>
                <input
                  type="number"
                  className="form-control"
                  id="nb-place-vol"
                  name="nb-place-vol"
                  placeholder="0"
                  min="1"
                  max="5"
                  onChange={() => {
                    this.setState({
                      place_libre: Number(
                        document.getElementById("nb-place-vol").value
                      ),
                    });
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleAddVol}
            >
              Ajouter ce vol
            </button>
          </div>
        </div>
      </div>
    );

    let errorDiv = this.state.hasError ? (
      <Alerts
        type="danger"
        content={
          <div className="col">
            <div className="row">
              Les données soumises ne sont pas cohérentes :
            </div>
            <div className="row">
              - vérifiez les dates et heures de départ et d'arrivé
            </div>
            <div className="row">
              - vérifiez les aéroports de départ et d'arrivée
            </div>
            <div className="row">- vérifiez le prix et le nombre de place</div>
            <div className="row">
              - vérifiez que l'ensemble des champs sont completés.
            </div>
          </div>
        }
        // content="Les données entrées ne sont pas cohérentes. Vérifiez que les dates et heures de départ et d'arrivée ainsi que les aéroports. Vérifiez que l'ensemble des champs sont completés."
      />
    ) : null;

    return (
      <div className="main col">
        <h1 className="title">Les vols</h1>

        <Modal
          idModal={"remove-vol-modal"}
          title={"Supprimer un vol"}
          body={this.state.modalVolContent}
          onClick={() => {
            this.handleDeleteVol(this.state.idVolToRemove);
          }}
        />

        <div className="flights-table">{flightsTable}</div>
        {errorDiv}
        <div className="form-margin">{reservation_table}</div>
      </div>
    );
  }
}

export default Vols;
