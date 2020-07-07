import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
export default class LoginUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);//assure le lien entre les méthodes et constructeur:
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: '',
            password: '',
            redirection: false
        }
    }

    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('login: ', this.state.login);
     console.log('password: ', this.state.password);
     
     const user = {
        login: this.state.login,
        password: this.state.password
    };

    axios.post('http://localhost:4242/api/login', user)
    .then(res => {
        if(res.data.status == 'ok') {
            console.log('youpi');
            localStorage.setItem('login', this.state.login);
            this.setState({ // to reinitialyse the form after being submitted
                login: "",
                password: "",
                redirection: true
            })
            this.setState({ // to reinitialyse the form after being submitted
                login: localStorage.getItem('login'),
                password: "",
                redirection: true
            });
        }else{
            console.log('Fail lllledzrgtrh');
        }
    });


}

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/users'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Be login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Your login: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.login}
                                onChange={this.onChangeLogin} required
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
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}