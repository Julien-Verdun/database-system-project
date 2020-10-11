import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Error from "./Components/Error/Error";
import Home from "./Components/Home/Home";
import FlightSearch from "./Components/FlightSearch/FlightSearch";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/flightsearch" component={FlightSearch}/>
          <Route path="/*" component={Error} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
