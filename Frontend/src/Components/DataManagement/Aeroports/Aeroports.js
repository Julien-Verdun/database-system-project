import React, { Component } from "react";
import "./Aeroports.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import DeleteIcon from "@material-ui/icons/Delete";
import {SERVERPATH} from "../../../serverParams.js";

class Aeroports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aeroportsList: null,
      nom: null,
      code:null,
      ville:null,
      pays:null,
      hasError: false,
    };
    this.handleAddAeroport = this.handleAddAeroport.bind(this);
    this.getAeroports = this.getAeroports.bind(this);
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
            <td>
              {elt.nom}
            </td>
            <td>
              {elt.code}
            </td>
            <td>{elt.ville}</td>
            <td>{elt.pays}</td>
            <td>
              <DeleteIcon
                onClick={() => {
                  this.handleDeleteAeroport(elt.id_aer);
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
          aeroportsList: null,
        });
      });
  }



  componentDidMount() {
    // get the list of all clients
    this.getAeroports();
    console.log("CLIENTS PAGE LOADED");
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
      nom: this.state.nom,
      code: this.state.code,
      ville: this.state.ville,
      pays: this.state.pays,
    };
    console.log(data);
    if (
      data.nom === null || data.code === null ||
      data.ville === null || data.pays === null
    ) {
      this.setState({ hasError: true });
    } else {
      axios
      .post(SERVERPATH + "/addAirport", data)
      .then((response) => {
          this.setState({  hasError: false });
          // handle success
          this.getAeroports();
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });
    }
  }

  render() {
    let aeroportsTable;

    if (this.state.aeroportsList === "") {
      aeroportsTable = this.state.aeroportsList;
    } else if (this.state.aeroportsList === null) {
      aeroportsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      aeroportsTable = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nom</th>
              <th scope="col">Code</th>
              <th scope="col">Ville</th>
              <th scope="col">Pays</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>{this.state.aeroportsList}</tbody>
        </table>
      );
    }
    let clientForm = (
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
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="input"
                        className="form-control"
                        id="nom"
                        name="nom"
                        placeholder="Aéroport de Miami"
                        onChange={() => {
                        this.setState({
                            nom: 
                            document.getElementById("nom").value
                            ,
                        });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input
                        type="input"
                        className="form-control"
                        id="code"
                        name="code"
                        placeholder="ADM"
                        onChange={() => {
                        this.setState({
                            code: 
                            document.getElementById("code").value
                            ,
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
                            ville: 
                            document.getElementById("ville").value
                            ,
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
                            pays: 
                            document.getElementById("pays").value
                            ,
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
          </div>}
      />
    ) : null;

    return (
      <div className="main col">
        <h1 className="title">Les aéroports</h1>

        <div className="flights-table">{aeroportsTable}</div>
        {errorDiv}
        <div className="form-margin">
        {clientForm}
        </div>
      </div>
    );
  }
}

export default Aeroports;
