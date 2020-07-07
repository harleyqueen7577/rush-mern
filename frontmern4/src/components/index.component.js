import React, { Component } from 'react';

import {BrowserRouter as Link} from "react-router-dom";


export default class Index extends Component {
render() {
    return (
        <div>
            <h3>Welcome to MICCROBBLOGGOS</h3>
           
           <p>You need to be connected to see the posts of our members
            <br></br>
           You are a member :
           <Link to={"/login"} className="btn btn-primary">Sign in</Link>
           <br></br>
           <br></br>
           You want to be a new member:
           <Link to={"/create"} className="btn btn-primary">Register</Link>
           </p>    
               
        </div>
    )
}
}