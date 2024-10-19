import React, { Component } from "react";

import { Link } from "react-router-dom";

class Adminitems extends Component{
    render(){
        return(
            <li id={this.props.item} className="Adminitems">
                <Link to={this.props.tolink}>{this.props.item}</Link>
            </li>
        );
    }
}

export default Adminitems