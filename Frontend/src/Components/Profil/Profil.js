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
    };
    this.getClient = this.getClient.bind(this);
  }

  componentDidMount() {
    this.getClient();
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

  render() {
    let listFeatures = [
        "Identifiant client",
        "Nom",
        "Prenom",
        "Mail",
        "Telephone",
      ],
      table;
    if (this.state.profil === null) {
      table = <CircularProgress />;
    } else if (this.state.profil === false) {
      table = (
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
    }
    return (
      <div className="main">
        <h1 className="profiltitle">Mon profil</h1>
        {table}
      </div>
    );
  }
}

export default Profil;
