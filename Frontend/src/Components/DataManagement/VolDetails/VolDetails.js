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
      <div
        className="col personnel"
        style={{ backgroundColor: this.props.style }}
      >
        <div className="row">
          <p className="bold-p">Fonction : </p>
          {" " + this.props.personnel.fonction}
        </div>
        <div className="row">
          <p className="bold-p">Adresse : </p>
          {" " + this.props.personnel.adresse}
        </div>
        <div className="row">
          <p className="bold-p">Nom : </p>
          {" " + this.props.personnel.nom}
        </div>
        <div className="row">
          <p className="bold-p">Prénom : </p>
          {" " + this.props.personnel.prenom}
        </div>
        <div className="row">
          <p className="bold-p">Numéro de licence : </p>
          {" " + this.props.personnel.numero_licence}
        </div>
        <div className="row">
          <p className="bold-p">Numéro de sécurité sociale : </p>

          {" " + this.props.personnel.numero_securite_sociale}
        </div>
        <div className="row">
          <p className="bold-p">Salaire : </p>
          {" " + this.props.personnel.salaire}
        </div>
        <div className="row">
          <p className="bold-p">Nombre d'heure de vol : </p>
          {" " + this.props.personnel.nombre_heure_vol}
        </div>
      </div>
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
            <div id="container">
              {this.state.dataEqp.map((per, index) => {
                return <Personnel key={index} personnel={per} style={"cyan"} />;
              })}
            </div>
          </div>
        )}

        {errorDiv}
      </div>
    );
  }
}

export default VolDetails;
