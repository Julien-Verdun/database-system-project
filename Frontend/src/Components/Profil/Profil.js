import React, { Component } from "react";
import "./Profil.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alerts from "../ToolsComponent/Alerts/Alerts";
import { SERVERPATH } from "../../serverParams.js";
import Table from "../ToolsComponent/Table/Table";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: null,
      modifiedNom: null,
      modifiedPrenom: null,
      modifiedMail: null,
      modifiedTelephone: null,
      isModeEdit: false,
    };
    this.getClient = this.getClient.bind(this);
    this.editClient = this.editClient.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  componentDidMount() {
    this.getClient();
  }

  handleModify() {
    if (this.state.isModeEdit) {
      this.editClient();
    }
    this.setState({ isModeEdit: !this.state.isModeEdit });
  }

  getClient() {
    axios
      .get(SERVERPATH + "/getClient/" + encodeURI(this.props.id_cli))
      .then((response) => {
        // handle success
        this.setState({ profil: response.data[0] });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ profil: false });
      });
  }

  editClient() {
    let data = { id_cli: this.props.id_cli };
    data["nom"] =
      this.state.modifiedNom !== null
        ? this.state.modifiedNom
        : this.state.profil.nom;
    data["prenom"] =
      this.state.modifiedPrenom !== null
        ? this.state.modifiedPrenom
        : this.state.profil.prenom;
    data["mail"] =
      this.state.modifiedMail !== null
        ? this.state.modifiedMail
        : this.state.profil.mail;
    data["telephone"] =
      this.state.modifiedTelephone !== null
        ? this.state.modifiedTelephone
        : this.state.profil.telephone;
    axios
      .post(SERVERPATH + "/editClient", data)
      .then((response) => {
        // handle success
        this.getClient();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  render() {
    let listFeatures = [
        "Identifiant client",
        "Nom",
        "Prenom",
        "Mail",
        "Telephone",
      ],
      table,
      clientForm;
    if (this.state.profil === null) {
      table = <CircularProgress />;
      clientForm = <CircularProgress />;
    } else if (this.state.profil === false) {
      table = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
      clientForm = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      table = (
        <Table
          listHeaders={["User"]}
          listItems={[
            this.props.id_cli,
            this.state.profil.nom,
            this.state.profil.prenom,
            this.state.profil.mail,
            this.state.profil.telephone,
          ].map((elt, index) => {
            return (
              <tr key={index}>
                <th scope="row">{listFeatures[index]}</th>
                <td>{elt}</td>
              </tr>
            );
          })}
        />
      );
      clientForm = (
        <div className="container">
          <form className="form-main">
            <div className="form-group">
              <label htmlFor="namecli">Nom</label>
              <input
                type="input"
                className="form-control"
                id="namecli"
                name="namecli"
                placeholder={this.state.profil.nom}
                onChange={() => {
                  this.setState({
                    modifiedNom: document.getElementById("namecli").value,
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
                placeholder={this.state.profil.prenom}
                onChange={() => {
                  this.setState({
                    modifiedPrenom: document.getElementById("prenom").value,
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
                placeholder={this.state.profil.mail}
                onChange={() => {
                  this.setState({
                    modifiedMail: document.getElementById("mail").value,
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
                placeholder={this.state.profil.telephone}
                onChange={() => {
                  this.setState({
                    modifiedTelephone: document.getElementById("telephone")
                      .value,
                  });
                }}
              />
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="main">
        <h1 className="profiltitle">Mon profil</h1>
        {this.state.isModeEdit ? clientForm : table}
        <button className="btn btn-primary" onClick={this.handleModify}>
          {this.state.isModeEdit ? "Sauvegarder" : "Modifier"}
        </button>
      </div>
    );
  }
}

export default Profil;
