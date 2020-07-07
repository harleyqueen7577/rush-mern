import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';

 

export default class FollowingUser extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            redirection: false
        };
    }
   
    onSubmit(e) {
        e.preventDefault();

        const login=this.props.match.params.login
        axios.get('http://localhost:4242/api/delete/'+login)
            .then(console.log('Deleted user'))
            this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
           
           redirection:true })
            .catch(err => console.log(err))
    }
    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/users'/>;
        } 
        return (
            <div>
                <p>
                    Confirmez vous vouloir suivre ce user?
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </p>
                <p>
                   Si non, retour au user
        
                   <Link to={"/monblog/"+this.props.match.params.login} className="btn btn-primary">User</Link>
               </p>
                
            </div>
            
            
        )
      }
    }
    
