import React, { Component } from "react";
import "./Clients.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import DeleteIcon from "@material-ui/icons/Delete";
import {SERVERPATH} from "../../../serverParams.js";

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientsList: null,
      nom:null,
      prenom:null,
      mail: null,
      telephone: null,
      hasError: false,
    };
    this.handleAddClient = this.handleAddClient.bind(this);
    this.getClients = this.getClients.bind(this);
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
  }

  getClients() {
    axios
      .get(SERVERPATH + "/getAllClients")
      .then((response) => {
        // handle success
        let clientsList = response.data.map((elt, index) => {
          return (
            <tr key={index}>
            <th scope="row">{index}</th>
            <td>
              {elt.nom}
            </td>
            <td>
              {elt.prenom}
            </td>
            <td>{elt.mail}</td>
            <td>{elt.telephone}</td>
            <td>
              <DeleteIcon
                onClick={() => {
                  this.handleDeleteClient(elt.id_cli);
                }}
              />
            </td>
          </tr>
          );
        });
        this.setState({
          clientsList,
          id_cli: response.data[0].id_cli,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          clientsList: null,
        });
      });
  }



  componentDidMount() {
    // get the list of all clients
    this.getClients();
    console.log("CLIENTS PAGE LOADED");
  }

  handleDeleteClient(id_cli) {
    let data = {
      id_cli: id_cli,
    };

    axios
      .post(SERVERPATH + "/deleteClient", data)
      .then((response) => {
        // handle success
        console.log(response);
        this.getClients();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleAddClient(event) {
    event.preventDefault();
    let data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.mail,
      telephone: this.state.telephone,
    };
    console.log(data);
    if (
      data.nom === null || data.prenom === null ||
      data.mail === null || data.telephone === null 
    ) {
      this.setState({ hasError: true });
    } else {
      axios
      .post(SERVERPATH + "/addClient", data)
      .then((response) => {
          this.setState({ hasError: false });
          // handle success
          this.getClients();
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });
    }
  }

  render() {
    let clientsTable;

    if (this.state.clientsList === null) {
      clientsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      clientsTable = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Mail</th>
              <th scope="col">Téléphone</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>{this.state.clientsList}</tbody>
        </table>
      );
    }
    let clientForm = (
      <div className="container">
          <div className="row">
            <div className="col">
            <h3>Ajouter un client</h3>
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
                        placeholder="Raymond"
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
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="input"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        placeholder="Debaze"
                        onChange={() => {
                        this.setState({
                            prenom: 
                            document.getElementById("prenom").value
                            ,
                        });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mail">Mail</label>
                    <input
                        type="input"
                        className="form-control"
                        id="mail"
                        name="mail"
                        placeholder="raymond.debaze@gmail.com"
                        onChange={() => {
                        this.setState({
                            mail: 
                            document.getElementById("mail").value
                            ,
                        });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                        type="input"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        placeholder="0434564321"
                        onChange={() => {
                        this.setState({
                            telephone: 
                            document.getElementById("telephone").value
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
              onClick={this.handleAddClient}
            >
              Ajouter ce client
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
        <h1 className="title">Les clients</h1>

        <div className="flights-table">{clientsTable}</div>
        {errorDiv}
        <div className="form-margin">
        {clientForm}
        </div>
      </div>
    );
  }
}

export default Clients;
