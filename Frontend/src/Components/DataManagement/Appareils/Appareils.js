import React, { Component } from "react";
import "./Appareils.css";
import axios from "axios";
import Alerts from "../../ToolsComponent/Alerts/Alerts";
import DeleteIcon from "@material-ui/icons/Delete";
import {SERVERPATH} from "../../../serverParams.js";

class Appareils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appareilsList: null,
      id_avn: null,
      id_cmp : null,

      type:null,
      nb_place : null,
      nom:null,
      code:null,

      hasErrorAvn: false,
      hasErrorCmp: false,
    };
    this.handleAddAppareil = this.handleAddAppareil.bind(this);
    this.handleAddAvion = this.handleAddAvion.bind(this);
    this.handleAddCompagnie = this.handleAddCompagnie.bind(this);

    this.getAppareils = this.getAppareils.bind(this);
    this.getAvions = this.getAvions.bind(this);
    this.getCompagnies = this.getCompagnies.bind(this);
    this.handleDeleteAppareil = this.handleDeleteAppareil.bind(this);
  }

  getAppareils() {
    axios
      .get(SERVERPATH + "/getAllAppareils")
      .then((response) => {
        // handle success
        let appareilsList = response.data.map((elt, index) => {
          return (
            <tr key={index}>
            <th scope="row">{index}</th>
            <td>
              {elt.type_avion}
            </td>
            <td>
              {elt.nb_place}
            </td>
            <td>{elt.nom_compagnie}</td>
            <td>{elt.code_compagnie}</td>
            <td>
              <DeleteIcon
                onClick={() => {
                  this.handleDeleteAppareil(elt.id_app);
                }}
              />
            </td>
          </tr>
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

  getAvions() {
    axios
      .get(SERVERPATH + "/getAllAvions")
      .then((response) => {
        // handle success
        let initial_id = response.data[0].id_avn;
        let avionsList = response.data.map((elt, index) => {
          return (
            <option value={elt.id_avn} key={elt.id_avn}>
              {elt.type + " (" + elt.nb_place + " places)"}
            </option>
          );
        });
        this.setState({
          avionsList,
          id_avn: initial_id,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          avionsList: null,
        });
      });
  }


  getCompagnies() {
    axios
      .get(SERVERPATH + "/getAllCompagnies")
      .then((response) => {
        // handle success
        let initial_id = response.data[0].id_cmp;
        let compagniesList = response.data.map((elt, index) => {
          return (
            <option value={elt.id_cmp} key={elt.id_cmp}>
              {elt.nom + " - " + elt.code}
            </option>
          );
        });
        this.setState({
          compagniesList,
          id_cmp: initial_id,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          compagniesList: null,
        });
      });
  }

  

  componentDidMount() {
    // get the list of all apparals
    this.getAppareils();
    // get the list of all avions
    this.getAvions();
    // get the list of all compagnies
    this.getCompagnies();
    console.log("APPAREILS PAGE LOADED");
  }

  handleDeleteAppareil(id_app) {
    let data = {
      id_app: id_app,
    };
    axios
      .post(SERVERPATH + "/deleteAppareil", data)
      .then((response) => {
        // handle success
        console.log(response);
        this.getAppareils();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleAddAppareil(event) {
    event.preventDefault();
    let data = {
      id_avn: this.state.id_avn,
      id_cmp: this.state.id_cmp
    };
    console.log(data);
    axios
    .post(SERVERPATH + "/addAppareil", data)
    .then((response) => {
        this.setState({ hasErrorAvn: false, hasErrorCmp:false });
        // handle success
        this.getAppareils();
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
  }

  handleAddAvion(event) {
    event.preventDefault();
    let data = {
      type: this.state.type,
      nb_place: this.state.nb_place
    };
    console.log(data);
    if (
      data.type === null || data.nb_place === null
    ) {
      this.setState({ hasErrorAvn: true, hasErrorCmp:false });
    } else {
      axios
      .post(SERVERPATH + "/addAvion", data)
      .then((response) => {
          this.setState({ hasErrorAvn: false, hasErrorCmp:false });
          // handle success
          this.getAvions();
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });
  }
  }


  handleAddCompagnie(event) {
    event.preventDefault();
    let data = {
      nom: this.state.nom,
      code: this.state.code
    };
    console.log(data);
    if (
      data.nom === null || data.code === null
    ) {
      this.setState({ hasErrorAvn: false, hasErrorCmp:true });
    } else {
      axios
      .post(SERVERPATH + "/addCompagnie", data)
      .then((response) => {
          this.setState({ hasErrorAvn: false, hasErrorCmp:false });
          // handle success
          this.getCompagnies();
      })
      .catch((error) => {
          // handle error
          console.log(error);
      });
    }
  }

  render() {
    let appareilsTable;

    if (this.state.result === "") {
      appareilsTable = this.state.result;
    } else if (this.state.result === null) {
      appareilsTable = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      appareilsTable = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Type avion</th>
              <th scope="col">Capacité</th>
              <th scope="col">Compagnie</th>
              <th scope="col">Code compagnie</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>{this.state.appareilsList}</tbody>
        </table>
      );
    }
    let appareilForm = (
      <div className="container">
          <div className="row">
            <div className="col">
            <h3>Ajouter un appareil</h3>
            </div>
        </div>
        <div className="row">
            <div className="col">
            <form className="form-main">
                
                <div className="form-group">
                <label htmlFor="avion-select">Avion</label>
                <select
                    className="form-control"
                    id="avion-select"
                    onChange={() => {
                    this.setState({
                        id_avn: Number(
                        document.getElementById("avion-select").value
                        ),
                    });
                    }}
                >
                    {this.state.avionsList}
                </select>
                </div>
                
                <div className="form-group">
                <label htmlFor="compagnie-select">
                    Compagnie
                </label>
                <select
                    className="form-control"
                    id="compagnie-select"
                    onChange={() => {
                    this.setState({
                        id_cmp: Number(
                        document.getElementById("compagnie-select").value
                        ),
                    });
                    }}
                >
                    {this.state.compagniesList}
                </select>
                </div>
            </form>
            </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleAddAppareil}
            >
              Ajouter cet appareil
            </button>
          </div>
        </div>
      </div>
    );


    let avionForm = (
        <div className="container">
            <div className="row">
              <div className="col">
              <h3>Ajouter un avion</h3>
              </div>
          </div>
          <div className="row">
              <div className="col">
              <form className="form-main">
                  
              <div className="form-group">
                <label htmlFor="type">Type d'appareil</label>
                <input
                    type="input"
                    className="form-control"
                    id="type"
                    name="type"
                    placeholder="A321"
                    onChange={() => {
                    this.setState({
                        type: 
                        document.getElementById("type").value
                        ,
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
                        placeholder="0"
                        min="0"
                        max="1000"
                        onChange={() => {
                        this.setState({
                            nb_place: Number(
                            document.getElementById("nb-place").value
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
                onClick={this.handleAddAvion}
              >
                Ajouter cet avion
              </button>
            </div>
          </div>
        </div>
      );





      let compagnieForm = (
        <div className="container">
            <div className="row">
              <div className="col">
              <h3>Ajouter une compagnie</h3>
              </div>
          </div>
          <div className="row">
              <div className="col">
              <form className="form-main">
                  
              <div className="form-group">
                <label htmlFor="nom">Nom de la compagnie</label>
                <input
                    type="input"
                    className="form-control"
                    id="nom"
                    name="nom"
                    placeholder="EasyJet"
                    onChange={() => {
                    this.setState({
                        nom:document.getElementById("nom").value
                        ,
                    });
                    }}
                />
                </div>
                  
                  <div className="form-group">
                    <label htmlFor="code">Code compagnie (trigramme)</label>
                    <input
                        type="input"
                        className="form-control"
                        id="code"
                        name="code"
                        placeholder="EAJ"
                        onChange={() => {
                        this.setState({
                            code: document.getElementById("code").value
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
                onClick={this.handleAddCompagnie}
              >
                Ajouter cette compagnie
              </button>
            </div>
          </div>
        </div>
      );


    let errorDiv = this.state.hasErrorAvn 
      ? (this.state.hasErrorCmp 
        ? <Alerts
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
        : <Alerts
        type="danger"
        content={
          <div className="col">
            <div className="row">
              Les données soumises ne sont pas cohérentes avec l'ajout d'un avion :
            </div>
            <div className="row">
              - vérifiez que l'ensemble des champs sont completés
            </div>
            <div className="row">
              - vérifiez que le nombre de place est un nombre entier.
            </div>
          </div>}
      />) 
      : (this.state.hasErrorCmp 
        ? <Alerts
        type="danger"
        content={
          <div className="col">
            <div className="row">
              Les données soumises ne sont pas cohérentes avec l'ajout d'une compagnie :
            </div>
            <div className="row">
              - vérifiez que l'ensemble des champs sont completés
            </div>
            <div className="row">
              - vérifiez que le code compagnie est un trigramme composé de 3 lettres (exemple : CDG).
            </div>
          </div>}
      /> 
        : null);

    return (
      <div className="main col">
        <h1 className="title">Les appareils</h1>

        <div className="flights-table">{appareilsTable}</div>
        {errorDiv}
        <div className="form-margin">
            
        {appareilForm}
        </div>
        <div className="form-margin">
        {avionForm}
            
        </div>
        <div className="form-margin">
        {compagnieForm}
            
        </div>
      </div>
    );
  }
}

export default Appareils;
