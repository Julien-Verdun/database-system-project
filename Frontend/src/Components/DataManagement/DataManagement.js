import React, { Component } from "react";
import "./DataManagement.css";
import Vols from "./Vols/Vols";

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
                <Vols />
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
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
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
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
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
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataManagement;
