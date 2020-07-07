import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';

 

export default class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            redirection: false
        };
    }
   

    delete() {
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
                    Confirmez vous le delete de ce user?
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </p>
                <p>
                   Si non, retour au user
        
                   <Link to={"/profil/"+this.props.match.params.login} className="btn btn-primary">User</Link>
               </p>
                
            </div>
            
            
        )
      }
    }
    
