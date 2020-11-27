import React, { Component } from "react";
import "./DataManagement.css";
import Vols from "./Vols/Vols";
import Appareils from "./Appareils/Appareils";
import Clients from "./Clients/Clients";
import Aeroports from "./Aeroports/Aeroports";

class DataManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <h1 className="title">Management de la base de données</h1>
        <div className="accordion" id="managementAccordion">
          <div className="card">
            <div className="card-header" id="headingVols">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseVols"
                  aria-expanded="false"
                  aria-controls="collapseVols"
                >
                  Vols
                </button>
              </h2>
            </div>

            <div
              id="collapseVols"
              className="collapse"
              aria-labelledby="headingVols"
              data-parent="#managementAccordion"
            >
              <div className="card-body">
                <Vols {...this.props} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingAppareils">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseAppareils"
                  aria-expanded="false"
                  aria-controls="collapseAppareils"
                >
                  Appareils
                </button>
              </h2>
            </div>
            <div
              id="collapseAppareils"
              className="collapse"
              aria-labelledby="headingAppareils"
              data-parent="#managementAccordion"
            >
              <div className="card-body">
                <Appareils />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingAeroports">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseAeroports"
                  aria-expanded="false"
                  aria-controls="collapseAeroports"
                >
                  Aéroports
                </button>
              </h2>
            </div>
            <div
              id="collapseAeroports"
              className="collapse"
              aria-labelledby="headingAeroports"
              data-parent="#managementAccordion"
            >
              <div className="card-body">
                <Aeroports />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingClients">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseClients"
                  aria-expanded="false"
                  aria-controls="collapseClients"
                >
                  Clients
                </button>
              </h2>
            </div>
            <div
              id="collapseClients"
              className="collapse"
              aria-labelledby="headingClients"
              data-parent="#managementAccordion"
            >
              <div className="card-body">
                <Clients />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataManagement;
