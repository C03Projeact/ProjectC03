import React, { Component } from "react";

import { Link } from "react-router-dom";

class Tabitems extends Component {
    render(){
        return(
            <span id={this.props.item}>
                <Link to={this.props.tolink}>{this.props.item}</Link>
            </span>
        );
    }
}
export default Tabitems;