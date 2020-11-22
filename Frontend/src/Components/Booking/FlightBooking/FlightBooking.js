import React, { Component } from "react";
import "./FlightBooking.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../../ToolsComponent/Modal/Modal";
import Billet from "../Billet/Billet";
import { SERVERPATH } from "../../../serverParams.js";
import Alerts from "../../ToolsComponent/Alerts/Alerts";

class FlightBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_vol: Number(window.location.pathname.split("/")[2]),
      dataBillet: null,
      prix: null,
      quantite: 1,
      hasError: null,
    };
    this.handleBookFlight = this.handleBookFlight.bind(this);
    this.changeQuantite = this.changeQuantite.bind(this);
  }

  changeQuantite(event) {
    event.preventDefault();
    console.log(Number(document.getElementById("quantity-ticket").value));
    this.setState({
      quantite: Number(document.getElementById("quantity-ticket").value),
    });
  }

  handleBookFlight(event) {
    event.preventDefault();
    let data = {
      id_cli: this.props.id_cli,
      id_vol: this.state.id_vol,
      prix: this.state.prix,
      quantite: this.state.quantite,
    };
    console.log("data : ", data);
    if (data.quantite > this.state.dataBillet.place_libre) {
      console.log("Pas assez de place");
      this.setState({ hasError: true });
    } else {
      axios
        .post(SERVERPATH + "/addReservation", data)
        .then((response) => {
          // handle success
          this.setState({ hasError: false });
          console.log("RESPONSE : ", response.data.resultsRes.insertId);
          let id_res = response.data.resultsRes.insertId;
          this.props.history.push("/reservation/" + id_res);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  componentDidMount() {
    axios
      .get(SERVERPATH + "/getVol/" + encodeURI(this.state.id_vol))
      .then((response) => {
        // handle success
        let dataBillet = response.data[0];
        this.setState({
          dataBillet,
          prix: dataBillet.prix_vol,
        });
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
    let modalContent =
      this.state.dataBillet !== null ? (
        <div className="col">
          <div className="raw modal-div">
            {"Vous vous apprêtez à réserver " +
              this.state.quantite +
              " billets pour le vol du " +
              this.state.dataBillet.date_depart +
              " à " +
              this.state.dataBillet.heure_depart +
              " au départ de : "}
            <p className="bold-p">
              {this.state.dataBillet.aer_dep_nom +
                ", " +
                this.state.dataBillet.aer_dep_pays}
            </p>
            {"à destination de : "}
            <p className="bold-p">
              {this.state.dataBillet.aer_arr_nom +
                ", " +
                this.state.dataBillet.aer_arr_pays +
                "."}
            </p>
          </div>
          <div className="raw modal-div">
            {"Cette opération est irréversible et vous sera facturée " +
              this.state.dataBillet.prix_vol * this.state.quantite +
              " €."}
          </div>
          <div className="raw modal-div">
            {" "}
            &Ecirc;tes-vous sûr de vouloir continuer ?
          </div>
        </div>
      ) : null;

    let errorDiv = this.state.hasError ? (
      <Alerts
        type="danger"
        content="Il n'y a pas assez de places disponibles dans ce vol"
      />
    ) : null;
    return (
      <div className="main col">
        <div className="row justify-content-center">
          <h1>Réserver un vol</h1>
        </div>

        {this.state.dataBillet === null ? (
          <CircularProgress />
        ) : this.state.dataBillet === false ? (
          <Alerts
            type="danger"
            content="Ce vol n'a pas été trouvé, veuillez nous excuser."
          />
        ) : (
          <Billet dataBillet={this.state.dataBillet} />
        )}

        {errorDiv}

        <div className="row justify-content-center">
          <label htmlFor="quantity-ticket">Quantité </label>
          <input
            type="number"
            id="quantity-ticket"
            name="quantity-ticket"
            onChange={this.changeQuantite}
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
          body={modalContent}
          onClick={this.handleBookFlight}
        />
      </div>
    );
  }
}

export default FlightBooking;
