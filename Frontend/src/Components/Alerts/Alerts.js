import React, { Component } from "react";

class Alerts extends Component {
  render() {
    if (this.props.type && this.props.content) {
      let className = "alert alert-" + this.props.type;
      return (
        <div className={className} role="alert">
          {this.props.content}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Alerts;
