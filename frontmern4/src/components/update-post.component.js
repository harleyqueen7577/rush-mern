import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export default class UpdatePost extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContenu = this.onChangeContenu.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: localStorage.getItem('login'),
            title: '',
            contenu: '',
            comments:[],
            redirection: false
        }
    }



    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeContenu(e) {
        this.setState({
            contenu: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('login: ', this.state.login);
     console.log('title: ', this.state.title);
     console.log('contenu: ', this.state.contenu);
     console.log('comments: ', this.state.comments);
     
    
    
     const  post= {
        login: this.state.login,
        title: this.state.title,
        contenu: this.state.contenu,
        comments: this.state.comments
    };
     const id=this.props.match.params.id
    axios.post('http://localhost:4242/api//updatepost/'+id, post)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            login: localStorage.getItem('login'),
            title: "",
            contenu: "",
            comments: [],
            redirection:true
        })
    }

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/allposts'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Update a Post  </h3>
                <form onSubmit={this.onSubmit}>
                   
                    <div className="form-group">
                        <label>The title: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                
                                value={this.state.title}
                                onChange={this.onChangeTitle} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Its Content: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                maxlength="140"
                                value={this.state.contenu}
                                onChange={this.onChangeContenu} 
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update the post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}