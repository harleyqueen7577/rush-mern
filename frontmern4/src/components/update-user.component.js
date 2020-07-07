import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export default class UpdateUser extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: localStorage.getItem('login'),
            email: '',
            password: '',
            confirmPassword: '',
            type: false,
            redirection: false
        }
    }

   
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('login: ', this.state.login);
     console.log('email: ', this.state.email);
     console.log('password: ', this.state.password);
     console.log('confirmPassword: ', this.state.confirmPassword);
     console.log('type: ', this.state.type);
    
    
     const user = {
        login: this.state.login,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        type: this.state.type
    };
const login= this.props.match.params.login
    axios.post('http://localhost:4242/api/update/'+login, user)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            login: localStorage.getItem('login'),
            email: "",
            password: "",
            confirmPassword: "",
            type: false,
            redirection:true
        })
    }

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/users'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Update User</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Your email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                               
                                value={this.state.email}
                                onChange={this.onChangeEmail} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Your password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Confirm Your password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword} required
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}