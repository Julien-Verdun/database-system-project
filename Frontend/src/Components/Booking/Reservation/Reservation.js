import React, { Component } from "react";
import "./Reservation.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../../ToolsComponent/Modal/Modal";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_res: window.location.pathname.split("/")[2],
      reservation: null,
      modalContent: "",
    };
    this.handleCancelReservation = this.handleCancelReservation.bind(this);
  }

  handleCancelReservation(event) {
    event.preventDefault();
    let data = {
      id_res: this.state.id_res,
    };
    console.log("data : ", data);
    axios
      .post("http://localhost:8080/deleteReservation", data)
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
        "http://localhost:8080/getReservation/" +
          encodeURI(this.props.id_cli) +
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
        let modalContent = (
          <div className="col">
            <div className="raw modal-div">
              {"Vous vous apprêtez à annuler votre réservation du " +
                resObj.date_depart +
                " à " +
                resObj.heure_depart +
                " au départ de : "}
              <p className="bold-p">
                {resObj.aer_dep_nom + ", " + resObj.aer_dep_pays}
              </p>
              {"à destination de : "}
              <p className="bold-p">
                {resObj.aer_arr_nom + ", " + resObj.aer_arr_pays + "."}
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
          onClick={this.handleCancelReservation}
        />
      </div>
    );
  }
}

export default Reservation;
