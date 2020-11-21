import React, { Component } from "react";
import "./RandomProposal.css";
import axios from "axios";
import { SERVERPATH } from "../../../serverParams.js";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

class Card extends Component {
  render() {
    let backgroundColor =
      this.props.flight.place_libre === 0
              ? "bisque"
              : null;
    return (

      <div
        className="row card-proposal"
        style={{ backgroundColor: backgroundColor }}
        onClick={() => {
          this.props.history.push(
            "/flightbooking/" + encodeURI(this.props.flight.id_vol)
          );
        }}
      >
        <div className="col-4">
          {this.props.flight.aer_dep_ville +
            ", " +
            this.props.flight.aer_dep_pays}
        </div>
        <div className="col-1">&rarr;</div>
        <div className="col-4">
          {this.props.flight.aer_arr_ville +
            ", " +
            this.props.flight.aer_arr_pays}
        </div>
        <div className="col-2">{this.props.flight.prix} €</div>
        {/* <div className="col-1">
          <MoreVertIcon />
        </div> */}
      </div>
    );
  }
}

class RandomProposal extends Component {
  /*
    This component displays some destination with price,
    randomly choosen
    */
  constructor(props) {
    super(props);
    this.state = {
      proposalsList: null,
    };
    this.getFlights = this.getFlights.bind(this);
    this.createProposals = this.createProposals.bind(this);

  }

  componentDidMount() {
    this.getFlights().then((flightsList) => {
      this.createProposals(flightsList);
    });
  }

  getFlights() {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVERPATH + "/getAllFutureFlights")
        .then((response) => {
          // handle success
          resolve(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
          resolve([]);
        });
    });
  }

  createProposals(flightsList) {
    let proposalsList = [],
      nbProposal =
        this.props.nbProposal === undefined ? 10 : this.props.nbProposal,
      indexArray = [];

    nbProposal = Math.min(nbProposal, flightsList.length);

    for (var i = 0; i < flightsList.length; i++) {
      indexArray.push(i);
    }
    // Math.floor(Math.random() * flightsList.length);
    for (var j = 0; j < nbProposal; j++) {
      var index = Math.floor(Math.random() * indexArray.length);
      proposalsList.push(
        <Card key={j} flight={flightsList[indexArray[index]]} {...this.props} />
      );
      indexArray.splice(index, 1);
    }
    this.setState({ proposalsList });
  }

  render() {
    return (
      <div className="main">
        <div>
          <h3>Une envie de voyage ?</h3>
        </div>
        <div>
          Nous avons concocté quelques voyages pour vous, alors intéressé(é) ?
          {console.log(this.state.proposalsList)}
        </div>
        <div className="col">{this.state.proposalsList}</div>
      </div>
    );
  }
}

export default RandomProposal;
