import React, { Component } from "react";
import "./Billet.css";

class Billet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_res: window.location.pathname.split("/")[2],
    };
  }

  render() {
    return (
      <div className="main col">
        {Object.keys(this.props.dataBillet).map((key, index) => {
          return (
            <div key={index} className="row">
              <div className="col">{key}</div>
              <div className="col">{this.props.dataBillet[key]}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Billet;