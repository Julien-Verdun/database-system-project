import React, { Component } from "react";
import "./Reservation.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../Modal/Modal";
import processDate from "../../utils";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_cli: window.location.pathname.split("/")[2],
      id_res: window.location.pathname.split("/")[3],
      reservation: null,
      modalContent: "",
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/getReservation/" +
          encodeURI(this.state.id_cli) +
          "/" +
          encodeURI(this.state.id_res)
      )
      .then((response) => {
        // handle success
        let resObj = response.data[0];
        console.log(resObj);
        let reservation = Object.keys(resObj).map((key, index) => {
          return (
            <div key={index} className="row">
              <div className="col">{key}</div>
              <div className="col">{resObj[key]}</div>
            </div>
          );
        });
        // console.log(resObj)
        let modalContent =
          "Vous vous apprêtez à annuler votre réservation du " +
          processDate(resObj.date_depart) +
          " à " +
          resObj.heure_depart +
          ".\n Cette opération est irréversible";
        this.setState({ reservation, modalContent });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <div className="main col">
        <h1>Ma réservation</h1>

        {this.state.reservation === null ? (
          <CircularProgress />
        ) : (
          this.state.reservation
        )}
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
        <Modal
          idModal={"annulation-modal"}
          title={"Annuler la réservation"}
          body={this.state.modalContent}
        />
      </div>
    );
  }
}

export default Reservation;
