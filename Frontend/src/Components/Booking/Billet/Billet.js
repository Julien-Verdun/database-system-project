import React, { Component } from "react";
import "./Billet.css";

function Card(date, heure, aeroport) {
  return (
    <div className="col center">
      <div className="row">{"Le : " + date}</div>
      <div className="row">&Agrave;{" : " + heure}</div>
      <div className="row">{"De : " + aeroport}</div>
    </div>
  );
}

class Billet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_res: window.location.pathname.split("/")[2],
    };
  }

  render() {
    let dataBillet = this.props.dataBillet;
    console.log(dataBillet);
    return (
      <div className="main-billet">
        <div className="row align-items-center">
          <div className="col">
            Départ
            {Card(
              dataBillet.date_depart,
              dataBillet.heure_depart,
              dataBillet.aer_dep_nom +
                ", " +
                dataBillet.aer_dep_ville +
                ", " +
                dataBillet.aer_dep_pays
            )}
          </div>
          <div className="col" style={{ fontSize: "64px" }}>
            &rarr;
          </div>
          <div className="col">
            Arrivée
            {Card(
              dataBillet.date_arrivee,
              dataBillet.heure_arrivee,
              dataBillet.aer_arr_nom +
                ", " +
                dataBillet.aer_arr_ville +
                ", " +
                dataBillet.aer_arr_pays
            )}
          </div>
        </div>

        <div className="col align-self-center">
          Prix du billet : {dataBillet.prix_vol + " €"}
        </div>
        <div className="col align-self-center">
          Compagnie : {dataBillet.cmp_nom}
        </div>
        <div className="col align-self-center">
          Avion :{" "}
          {dataBillet.type +
            " (" +
            dataBillet.place_libre +
            " places disponibles sur " +
            dataBillet.nb_place +
            ")"}
        </div>
      </div>
    );
  }
}

export default Billet;
