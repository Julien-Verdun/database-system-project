import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import {SERVERPATH} from "../../serverParams.js";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      nom_client : null,
      listeClientOptions: null,
    };
    this.handleChangeClient = this.handleChangeClient.bind(this);
    this.getClient = this.getClient.bind(this);
  }

  handleChangeClient(event) {
    event.preventDefault();
    this.props.changeCli(
      Number(document.getElementById("inputGroupSelectClients").value)
    );
  }

  getClient(id_cli){
    axios
    .get(SERVERPATH + "/getClient/" + encodeURI(id_cli))
    .then((response) => {
      // handle success
      this.setState({nom_client: response.data[0].nom});
    })
    .catch((error) => {
      // handle error
      console.log(error);
      this.setState({nom_client:null});
    });
}

  componentDidMount() {
    this.createSelectClients();
    this.getClient(this.props.id_cli);
  }

  createSelectClients() {
    axios
      .get(SERVERPATH + "/getAllClients")
      .then((response) => {
        // handle success
        // on place en premiere position l'option dont l'id est celui du client selectionné
        let listeClientOptions = response.data
          .map((elt, index) => {
            return elt.id_cli !== this.props.id_cli ? (
              <option value={elt.id_cli} key={elt.id_cli}>
                {elt.nom + " " + elt.prenom + "(" + elt.mail + ")"}
              </option>
            ) : null;
          })
          .filter((elt) => elt !== null);
        let selectedCli = response.data.find(
          (datum) => datum.id_cli === this.props.id_cli
        );
        let firstOption = (
          <option value={selectedCli.id_cli} key={selectedCli.id_cli}>
            {selectedCli.nom +
              " " +
              selectedCli.prenom +
              "(" +
              selectedCli.mail +
              ")"}
          </option>
        );
        listeClientOptions = [firstOption].concat(listeClientOptions);
        this.setState({ listeClientOptions });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ listeClientOptions: null });
      });
  }

  render() {

    let managementButton = (this.state.nom_client === "admin" ?
      <div className="col">
          <button
            className="btn btn-warning"
            onClick={() => {
              this.props.history.push("/datamanagement");
            }}
          >
            Management
          </button>
        </div>
        :
        null);
    return (
      <div className="main">
        <h1>Bienvenue sur la page d'accueil</h1>
        <div>Contenu page d'accueil</div>

        <div className="input-group input-client">
          <select
            className="custom-select"
            id="inputGroupSelectClients"
            onChange={this.handleChangeClient}
          >
            {this.state.listeClientOptions}
          </select>
        </div>

        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.history.push("/flightsearch");
            }}
          >
            Flight Search
          </button>
        </div>
        {managementButton}
      </div>
    );
  }
}

export default Home;
