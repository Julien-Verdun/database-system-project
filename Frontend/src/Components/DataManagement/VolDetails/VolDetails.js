import React, { Component } from "react";
import "./VolDetails.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Billet from "../../Booking/Billet/Billet";
import { SERVERPATH } from "../../../serverParams.js";
import Alerts from "../../ToolsComponent/Alerts/Alerts";

class Personnel extends Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.personnel.id_per}</th>
        <td>
          {this.props.personnel.fonction}
        </td>
        <td>
          {this.props.personnel.adresse}
        </td>
        <td>
          {this.props.personnel.nom}
        </td>
        <td>
          {this.props.personnel.prenom}
        </td>
        <td>
          {this.props.personnel.numero_licence}
        </td>
        <td>
          {this.props.personnel.numero_securite_sociale}
        </td>
        <td>
          {this.props.personnel.salaire + " €"}
        </td>
        <td>
          {this.props.personnel.nombre_heure_vol + " h"}
        </td>
      </tr>
    );
  }
}

class VolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_vol: Number(window.location.pathname.split("/")[2]),
      dataVol: null,
      dataEqp: null,
      hasError: null,
    };
  }

  componentDidMount() {
    axios
      .get(SERVERPATH + "/getVolEquipage/" + encodeURI(this.state.id_vol))
      .then((response) => {
        // handle success
        let dataEqp = response.data;
        this.setState({
          dataEqp,
        });
        console.log("dataEqp : ", dataEqp);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          dataEqp: false,
        });
      });

    axios
      .get(SERVERPATH + "/getVol/" + encodeURI(this.state.id_vol))
      .then((response) => {
        // handle success
        let dataVol = response.data[0];
        this.setState({
          dataVol,
        });
        console.log("dataVol : ", dataVol);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          dataVol: false,
        });
      });
  }
  render() {
    let errorDiv = this.state.hasError ? (
      <Alerts
        type="danger"
        content="Il n'y a pas assez de places disponibles dans ce vol"
      />
    ) : null;
    return (
      <div className="main col">
        <div className="row justify-content-center">
          <h1>Information sur le vol</h1>
        </div>

        {this.state.dataVol === null || this.state.dataEqp === null ? (
          <CircularProgress />
        ) : this.state.dataVol === false || this.state.dataEqp === false ? (
          <Alerts
            type="danger"
            content="Ce vol n'a pas été trouvé, veuillez nous excuser."
          />
        ) : (
          <div>
            <Billet dataBillet={this.state.dataVol} />
            <div>
              <h2>Equipage</h2>
              <table className="table table-striped table-bordered table-hover">
                <thead id="table-header">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Fonction</th>
                    <th scope="col">Adresse </th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">License</th>
                    <th scope="col">Sécurité sociale</th>
                    <th scope="col">Salaire</th>
                    <th scope="col">Heures de vol</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataEqp.map((per, index) => {
                    return <Personnel key={index} personnel={per} style={"cyan"} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {errorDiv}
      </div>
    );
  }
}

export default VolDetails;
