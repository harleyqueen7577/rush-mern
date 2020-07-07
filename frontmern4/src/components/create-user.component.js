import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);//assure le lien entre les méthodes et constructeur:
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
            type: false,
            follows:[],
            followings:[],
            login_existing:false,
            correct_password:true,
            correct_email:true,
            redirection: false
        }
    }

    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        });
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
     console.log('follows: ', this.state.follows);
     console.log('followings: ', this.state.followings);
     
     const testlogin={login:this.state.login}
     axios.post('http://localhost:4242/api/testlogin', testlogin)
        .then(res => {
         console.log(res.data);
    
         const user = {
        login: this.state.login,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        type: this.state.type,
        follows: this.state.follows,
        followings: this.state.followings
        }
             if(this.state.password === this.state.confirmPassword 
                && RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email)
                && this.state.login.length<21
                && this.state.login.length>4){
                 axios.post('http://localhost:4242/api/create', user)
               .then(res => console.log(res.data));
        
                     this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
                     login: "",
                     email: "",
                    password: "",
                    confirmPassword: "",
                    type: false,
                    follows:[],
                    followings:[],
                    redirection:true
                     })
               } else{
                    console.log('dan le else')
                    this.setState({
                    correct_email:false,
                    correct_password:false
                   });
                 }
      })
    .catch(err=>{
          console.log(err);
          this.setState({
           login_existing:true})
         });
    }
    
    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/login'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Your login: </label>
                        <input  type="text"
                                className="form-control"
                                minLength="5"
                                maxLength="20"
                                value={this.state.login}
                                placeholder="your login between 5 and 20 characters"
                                onChange={this.onChangeLogin} required
                                />
                                {this.state. login_existing === true &&
                                <p style={{color:"red"}}>Login already exist!</p>}
                    </div>
                    <div className="form-group">
                        <label>Your email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                                placeholder="your email"
                                value={this.state.email}
                                onChange={this.onChangeEmail} required
                                />
                        {this.state.correct_email === false &&
                       <p style={{color:"red"}}>email is not correct!</p>}
                    </div>
                    <div className="form-group">
                        <label>Your password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                placeholder="your password"
                                value={this.state.password}
                                onChange={this.onChangePassword} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Confirm Your password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                placeholder="confirm your password"
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword} required
                                />
                                 {this.state.correct_password === false &&
                                <p style={{color:"red"}}>password and confirm password must be the same!</p>}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}