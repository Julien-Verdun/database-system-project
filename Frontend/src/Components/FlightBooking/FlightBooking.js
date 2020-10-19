import React, { Component } from "react";
import "./FlightBooking.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../Modal/Modal";

class FlightBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_cli: Number(window.location.pathname.split("/")[2]),
      id_vol: Number(window.location.pathname.split("/")[3]),
      reservation: null,
      modalContent: "",
      prix: null,
      quantite: 1,
    };
    this.handleBookFlight = this.handleBookFlight.bind(this);
  }

  handleBookFlight(event) {
    event.preventDefault();
    let data = {
      id_cli: this.state.id_cli,
      id_vol: this.state.id_vol,
      prix: this.state.prix,
      quantite: Number(document.getElementById("quantity-ticket").value),
    };
    console.log("data : ", data);
    axios
      .post("http://localhost:8080/addReservation", data)
      .then((response) => {
        // handle success
        console.log("RESPONSE : ", response.data.insertId);
        let id_res = response.data.insertId;
        this.props.history.push(
          "/reservation/" + this.state.id_cli + "/" + id_res
        );
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/getVol/" + encodeURI(this.state.id_vol))
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
              {"Vous vous apprêtez à réserver le vol du " +
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
              {"Cette opération est irréversible et vous sera facturée " +
                resObj.prix_vol +
                " €."}
            </div>
            <div className="raw modal-div">
              {" "}
              &Ecirc;tes-vous sûr de vouloir continuer ?
            </div>
          </div>
        );
        this.setState({
          reservation,
          modalContent,
          prix: resObj.prix_vol,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <div className="main col">
        <div className="row justify-content-center">
          <h1>Réserver un vol</h1>
        </div>

        {this.state.reservation === null ? (
          <CircularProgress />
        ) : (
          this.state.reservation
        )}

        <div className="row justify-content-center">
          <label htmlFor="quantity-ticket">Quantité </label>
          <input
            type="number"
            id="quantity-ticket"
            name="quantity-ticket"
            min="1"
            max="100"
            defaultValue="1"
          />
        </div>
        <div className="row  justify-content-center">
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#annulation-modal"
            onClick={() => {
              console.log("Réservation");
            }}
          >
            Réserver ce vol
          </button>
        </div>

        <Modal
          idModal={"annulation-modal"}
          title={"Annuler la réservation"}
          body={this.state.modalContent}
          onClick={this.handleBookFlight}
        />
      </div>
    );
  }
}

export default FlightBooking;
