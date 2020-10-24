import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Error from "./Components/Error/Error";
import Home from "./Components/Home/Home";
import Profil from "./Components/Profil/Profil";
import FlightSearch from "./Components/Booking/FlightSearch/FlightSearch";
import FlightBooking from "./Components/Booking/FlightBooking/FlightBooking";
import MyReservations from "./Components/Booking/MyReservations/MyReservations";
import Reservation from "./Components/Booking/Reservation/Reservation";
import DataManagement from "./Components/DataManagement/DataManagement";
import Appareils from "./Components/DataManagement/Appareils/Appareils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_cli: 100,
    };
    this.changeCli = this.changeCli.bind(this);
  }

  changeCli(id_cli) {
    this.setState({ id_cli: id_cli });
  }

  render() {
    return (
      <BrowserRouter>
        <Header id_cli={this.state.id_cli} />
        <Switch>
          <Route
            exact
            path="/home"
            component={(props) => (
              <Home
                id_cli={this.state.id_cli}
                changeCli={this.changeCli}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={(props) => (
              <Home
                id_cli={this.state.id_cli}
                changeCli={this.changeCli}
                {...props}
              />
            )}
          />
          <Route exact path="/flightsearch" component={FlightSearch} />
          <Route
            exact
            path="/flightbooking/:id_cli/:id_vol"
            component={FlightBooking}
          />
          <Route
            exact
            path="/myreservations"
            component={(props) => (
              <MyReservations id_cli={this.state.id_cli} {...props} />
            )}
          />
          <Route
            exact
            path="/profil"
            component={(props) => (
              <Profil id_cli={this.state.id_cli} {...props} />
            )}
          />
           {/* <Route
            exact
            path="/appareils"
            component={Appareils}
          /> */}
          <Route
            exact
            path="/reservation/:id_res"
            component={(props) => (
              <Reservation id_cli={this.state.id_cli} {...props} />
            )}
          />
          <Route exact path="/datamanagement" component={DataManagement} />
          <Route path="/*" component={Error} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
