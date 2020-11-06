import React, { Component } from "react";
import "./RandomProposal.css";
import axios from "axios";
import { SERVERPATH } from "../../../serverParams.js";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="row card-proposal"
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
      flightsList: null,
      proposalsList: null,
    };
    this.getFlights = this.getFlights.bind(this);
    this.createProposals = this.createProposals.bind(this);
  }

  componentDidMount() {
    this.getFlights().then((flightsList) => {
      this.createProposals();
    });
  }

  getFlights() {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVERPATH + "/getAllFutureFlights")
        .then((response) => {
          // handle success
          this.setState({
            flightsList: response.data,
          });
          resolve(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.setState({
            flightsList: null,
          });
        });
    });
  }

  createProposals() {
    let proposalsList = [],
      nbProposal =
        this.props.nbProposal === undefined ? 10 : this.props.nbProposal,
      indexArray = [];

    nbProposal = Math.min(nbProposal, this.state.flightsList.length);

    for (var i = 0; i < this.state.flightsList.length; i++) {
      indexArray.push(i);
    }
    // Math.floor(Math.random() * this.state.flightsList.length);
    for (var i = 0; i < nbProposal; i++) {
      var index = Math.floor(Math.random() * indexArray.length);
      proposalsList.push(
        <Card
          key={i}
          flight={this.state.flightsList[indexArray[index]]}
          {...this.props}
        />
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
          Nous avons concocté quelques voyages pour vous, alors intéressez ?
        </div>
        <div className="col">{this.state.proposalsList}</div>
      </div>
    );
  }
}

export default RandomProposal;
