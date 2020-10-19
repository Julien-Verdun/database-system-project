import React, { Component } from "react";
import "./Home.css";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      listeClientOptions: null,
    };
    this.handleChangeClient = this.handleChangeClient.bind(this);
  }

  handleChangeClient(event) {
    event.preventDefault();
    this.props.changeCli(
      Number(document.getElementById("inputGroupSelectClients").value)
    );
  }

  componentDidMount() {
    this.createSelectClients();
  }

  createSelectClients() {
    axios
      .get("http://localhost:8080/getAllClients")
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
      </div>
    );
  }
}

export default Home;
