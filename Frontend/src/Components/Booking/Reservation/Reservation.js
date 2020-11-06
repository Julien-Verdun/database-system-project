import React, { Component } from "react";
import "./Reservation.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../../ToolsComponent/Modal/Modal";
import Billet from "../Billet/Billet";
import { SERVERPATH } from "../../../serverParams.js";
import Alerts from "../../ToolsComponent/Alerts/Alerts";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_res: window.location.pathname.split("/")[2],
      dataBillet: null,
      modalContent: "",
    };
    this.handleCancelReservation = this.handleCancelReservation.bind(this);
  }

  handleCancelReservation(event) {
    event.preventDefault();
    let data = {
      id_res: this.state.id_res,
      id_vol: this.state.dataBillet.id_vol,
      quantite: this.state.dataBillet.quantite,
    };
    console.log("data : ", data);
    axios
      .post(SERVERPATH + "/deleteReservation", data)
      .then((response) => {
        // handle success
        this.props.history.push("/myreservations");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get(
        SERVERPATH +
          "/getReservation/" +
          encodeURI(this.props.id_cli) +
          "/" +
          encodeURI(this.state.id_res)
      )
      .then((response) => {
        // handle success
        let dataBillet = response.data[0];
        console.log("dataBillet : ", dataBillet);
        let modalContent = (
          <div className="col">
            <div className="raw modal-div">
              {"Vous vous apprêtez à annuler votre réservation du " +
                dataBillet.date_depart +
                " à " +
                dataBillet.heure_depart +
                " au départ de : "}
              <p className="bold-p">
                {dataBillet.aer_dep_nom + ", " + dataBillet.aer_dep_pays}
              </p>
              {"à destination de : "}
              <p className="bold-p">
                {dataBillet.aer_arr_nom + ", " + dataBillet.aer_arr_pays + "."}
              </p>
            </div>
            <div className="raw modal-div">
              {
                "Cette opération est irréversible et peut engendrer des frais supplémentaires."
              }
            </div>
            <div className="raw modal-div">
              {" "}
              &Ecirc;tes-vous sûr de vouloir continuer ?
            </div>
          </div>
        );
        this.setState({ dataBillet, modalContent });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          dataBillet: false,
        });
      });
  }
  render() {
    return (
      <div className="main col">
        <h1>Ma réservation</h1>

        {this.state.dataBillet === null ? (
          <CircularProgress />
        ) : this.state.dataBillet === false ? (
          <Alerts
            type="danger"
            content="Cette réservation n'a pas été trouvée, veuillez nous excuser."
          />
        ) : (
          <Billet dataBillet={this.state.dataBillet} />
        )}
        <div className="row  justify-content-center">
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#annulation-modal"
            onClick={() => {
              console.log("Annuler le téléchargement");
            }}
          >
            Annuler cette réservation
          </button>
        </div>
        <Modal
          idModal={"annulation-modal"}
          title={"Annuler la réservation"}
          body={this.state.modalContent}
          onClick={this.handleCancelReservation}
        />
      </div>
    );
  }
}

export default Reservation;
