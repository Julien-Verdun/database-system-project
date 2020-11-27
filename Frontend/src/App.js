import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
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
import VolDetails from "./Components/DataManagement/VolDetails/VolDetails";
import Login from "./Components/Login/Login";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
// import passwordHash from "password-hash";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);

    /*
    superuser@admin  ->  admin
    julien.verdun@ecl17.ec-lyon.fr  ->  password
    maxime.peter@ecl17.ec-lyon.fr  -> password
    */
    // let listMotDePasse = ["sbdappmdp**"];
    // listMotDePasse.forEach((mdp) => {
    //   console.log(mdp, passwordHash.generate(mdp));
    // });
    const { cookies } = props;
    this.cookies = cookies;

    if (this.cookies.get("isAuth") === undefined) {
      this.cookies.set("isAuth", false, { path: "/" });
    }
    if (this.cookies.get("idCli") === undefined) {
      this.cookies.set("idCli", null, { path: "/" });
    }
    this.state = {
      isAuth: this.cookies.get("isAuth") === "true" || false,
      id_cli: Number(this.cookies.get("idCli")) || null,
    };
    this.authentification = this.authentification.bind(this);
    this.logout = this.logout.bind(this);
  }

  authentification(isAuth, id_cli) {
    this.setState({ isAuth: isAuth, id_cli: id_cli });
    this.cookies.set("isAuth", isAuth, { path: "/", maxAge: 1800 });
    this.cookies.set("idCli", id_cli, { path: "/", maxAge: 1800 });
    console.log(this.cookies.cookies);
  }

  logout() {
    this.setState({ isAuth: false, id_cli: null });
    this.cookies.set("isAuth", false, { path: "/" });
    this.cookies.set("idCli", null, { path: "/" });
  }

  render() {
    let app =
      this.state.isAuth === false || this.state.id_cli === null ? (
        <Login authentification={this.authentification} />
      ) : (
        <BrowserRouter>
          <Header id_cli={this.state.id_cli} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/home"
              component={(props) => (
                <Home id_cli={this.state.id_cli} {...props} />
              )}
            />
            <Route
              exact
              path="/"
              component={(props) => (
                <Home id_cli={this.state.id_cli} {...props} />
              )}
            />
            <Route
              exact
              path="/flightsearch"
              component={(props) => (
                <FlightSearch id_cli={this.state.id_cli} {...props} />
              )}
            />
            <Route
              exact
              path="/flightbooking/:id_vol"
              component={(props) => (
                <FlightBooking id_cli={this.state.id_cli} {...props} />
              )}
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
            <Route
              exact
              path="/reservation/:id_res"
              component={(props) => (
                <Reservation id_cli={this.state.id_cli} {...props} />
              )}
            />
            <Route exact path="/datamanagement" component={DataManagement} />
            <Route
              exact
              path="/voldetails/:id_vol"
              component={(props) => (
                <VolDetails id_cli={this.state.id_cli} {...props} />
              )}
            />

            <Route path="/*" component={Error} />
          </Switch>
          <Footer />
        </BrowserRouter>
      );
    return <CookiesProvider>{app}</CookiesProvider>;
  }
}

export default withCookies(App);
