import React, { Component } from "react";


class Table extends Component {
  render() {
      return(
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                <th scope="col"></th>
                {this.props.listHeaders.map((elt,index) => {
                    return (<th key={index} scope="col">{elt}</th>)
                })}
            </tr>
            </thead>
            <tbody>{this.props.listItems}</tbody>
        </table>
        );
    }
}

export default Table;
