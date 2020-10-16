import React, { Component } from "react";
import "./FlightSearch.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      listeAirportsOptions: null,
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.createSelectAirports();
  }
  createSelectAirports() {
    axios
      .get("http://localhost:8080/getAllAirportsIdName")
      .then((response) => {
        // handle success
        console.log(response)
        let listeAirportsOptions = response.data.map((elt, index) => {
          return (
            <option value={elt.id_aer} key={elt.id_aer}>
              {elt.nom}
            </option>
          );
        });
        this.setState({ listeAirportsOptions });
        console.log(this.state.listeAirportsOptions);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ listeAirportsOptions: null });
      });
  }

  handleClickSearch(event) {
    event.preventDefault();
    let travelDate = encodeURI(document.getElementById("departure-input").value);
    let departureAirportId = encodeURI(document.getElementById("from-airport").value); 
    let arrivalAirportId = encodeURI(document.getElementById("to-airport").value);
    let nbPassengers = encodeURI(document.getElementById("nb-passengers-input").value);
    console.log(travelDate, departureAirportId, arrivalAirportId, nbPassengers)
  }
  render() {
    let table;

    if (this.state.result === "") {
      table = this.state.result;
    } else if (this.state.result === null) {
      table = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Airport name</th>
            </tr>
          </thead>
          <tbody>{this.state.result}</tbody>
        </table>
      );
    }
    return (
      <div className="main">
        <h1>Bienvenue sur la page de recherche</h1>
        <div>Blabla</div>
        <div className="col">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_246830.png"
            alt="home"
            width="200px"
            style={{ margin: "20px" }}
          />
        </div>
        <form>
          <div className="form-group">
            <label>Departure date</label>
            <input className="form-control" id="departure-input" placeholder="Enter a departure date"></input>
            <small className="form-text text-muted">Please enter the date in the format YYYY:MM:DD</small>
          </div>
          <div className="form-group">
            <label>From </label>
              <select name="from-airports" id="from-airport" className="custom-select">
                {this.state.listeAirportsOptions}
              </select>
           </div>
          <div className="form-group">
            <label>To </label>
              <select name="to-airports" id="to-airport" className="custom-select">
                {this.state.listeAirportsOptions}
              </select>
          </div>
          <div className="form-group">
            <label>Number of passengers </label>
            <input className="form-control" id="nb-passengers-input" placeholder="Enter the number of passengers"></input>
          </div>
        </form>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              <button className="btn btn-primary" onClick={this.handleClickSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col">
              <button className="btn btn-primary" onClick={() => {this.props.history.push('/home')}}>
                Home Page
              </button>
          </div>
        </div>
        </div>
        <div className="result">{table}</div>
      </div>
    );
  }
}

export default FlightSearch;
