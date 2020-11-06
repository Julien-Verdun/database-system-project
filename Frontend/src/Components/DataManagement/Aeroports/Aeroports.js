import React, { Component } from "react";
import "./Aeroports.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import Table from "../../ToolsComponent/Table/Table";
import DeleteIcon from "@material-ui/icons/Delete";
import { SERVERPATH } from "../../../serverParams.js";
import Modal from "../../ToolsComponent/Modal/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";

class Aeroports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aeroportsList: null,
      nameaer: null,
      codeaer: null,
      ville: null,
      pays: null,
      hasError: false,
      modalAerContent: "",
      idAerToRemove: null,
    };
    this.handleAddAeroport = this.handleAddAeroport.bind(this);
    this.getAeroports = this.getAeroports.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
    this.handleDeleteAeroport = this.handleDeleteAeroport.bind(this);
  }

  getAeroports() {
    axios
      .get(SERVERPATH + "/getAllAirports")
      .then((response) => {
        // handle success
        let aeroportsList = response.data.map((elt, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{elt.nom}</td>
              <td>{elt.code}</td>
              <td>{elt.ville}</td>
              <td>{elt.pays}</td>
              <td>
                <DeleteIcon
                  data-toggle="modal"
                  data-target="#remove-aer-modal"
                  onClick={() => {
                    this.setState({
                      idAerToRemove: elt.id_aer,
                      modalAerContent: (
                        <div className="col">
                          <div className="raw modal-div">
                            {"Vous vous apprêtez à supprimer l'aéroport :"}
                            <p className="bold-p">
                              {elt.nom +
                                " (" +
                                elt.code +
                                "), " +
                                elt.ville +
                                ", " +
                                elt.pays}
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
          aeroportsList,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          aeroportsList: false,
        });
      });
  }

  componentDidMount() {
    // get the list of all clients
    this.getAeroports();
    console.log("CLIENTS PAGE LOADED");
  }

  resetInputs() {
    document.getElementById("nameaer").value = "";
    document.getElementById("codeaer").value = "";
    document.getElementById("ville").value = "";
    document.getElementById("pays").value = "";

    this.setState({ nameaer: null, codeaer: null, ville: null, pays: null });
  }

  handleDeleteAeroport(id_aer) {
    let data = {
      id_aer: id_aer,
    };

    axios
      .post(SERVERPATH + "/deleteAirport", data)
      .then((response) => {
        // handle success
        console.log(response);
        this.getAeroports();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleAddAeroport(event) {
    event.preventDefault();
    let data = {
      nom: this.state.nameaer,
      code: this.state.codeaer,
      ville: this.state.ville,
      pays: this.state.pays,
    };
    console.log(data);
    if (
      data.nom === null ||
      data.code === null ||
      data.ville === null ||
      data.pays === null
    ) {
      this.setState({ hasError: true });
    } else {
      axios
        .post(SERVERPATH + "/addAirport", data)
        .then((response) => {
          this.setState({ hasError: false });
          // handle success
          this.getAeroports();
          this.resetInputs();
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  render() {
    let aeroportsTable;

    if (this.state.aeroportsList === null) {
      aeroportsTable = <CircularProgress />;
    } else if (this.state.aeroportsList === false) {
      aeroportsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else if (this.state.aeroportsList.length === 0) {
      aeroportsTable = (
        <Alerts type="warning" content="Il n'existe aucun aéroport." />
      );
    } else {
      aeroportsTable = (
        <Table
          listHeaders={["Nom", "Code", "Ville", "Pays", "Supprimer"]}
          listItems={this.state.aeroportsList}
        />
      );
    }
    let aeroportForm = (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Ajouter un aéroport</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form className="form-main">
              <div className="form-group">
                <label htmlFor="nameaer">Nom</label>
                <input
                  type="input"
                  className="form-control"
                  id="nameaer"
                  name="nameaer"
                  placeholder="Aéroport de Miami"
                  onChange={() => {
                    this.setState({
                      nameaer: document.getElementById("nameaer").value,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="codeaer">Code</label>
                <input
                  type="input"
                  className="form-control"
                  id="codeaer"
                  name="codeaer"
                  placeholder="ADM"
                  onChange={() => {
                    this.setState({
                      codeaer: document.getElementById("codeaer").value,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ville">Ville</label>
                <input
                  type="input"
                  className="form-control"
                  id="ville"
                  name="ville"
                  placeholder="Miami"
                  onChange={() => {
                    this.setState({
                      ville: document.getElementById("ville").value,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Pays</label>
                <input
                  type="input"
                  className="form-control"
                  id="pays"
                  name="pays"
                  placeholder="USA"
                  onChange={() => {
                    this.setState({
                      pays: document.getElementById("pays").value,
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
              onClick={this.handleAddAeroport}
            >
              Ajouter cet aéroport
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
              - vérifiez que l'ensemble des champs sont completés.
            </div>
          </div>
        }
      />
    ) : null;

    return (
      <div className="main col">
        <h1 className="title">Les aéroports</h1>

        <Modal
          idModal={"remove-aer-modal"}
          title={"Supprimer un aéroport"}
          body={this.state.modalAerContent}
          onClick={() => {
            this.handleDeleteAeroport(this.state.idAerToRemove);
          }}
        />

        <div className="flights-table">{aeroportsTable}</div>
        {errorDiv}
        <div className="form-margin">
          {this.state.aeroportsList === null ||
          this.state.aeroportsList === false
            ? null
            : aeroportForm}
        </div>
      </div>
    );
  }
}

export default Aeroports;
