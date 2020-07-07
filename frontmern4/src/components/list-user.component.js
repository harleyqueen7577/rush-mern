import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class ListUser extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { users: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        axios.get('http://localhost:4242/api/users')
            .then(response => {
                this.setState({ users: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    /*
    UserList() {
        return this.state.users.map(function (currentUser, i) {
            return <UserList users={currentUser} key={i} />;
        })
    */
    render() {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>login</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user) =>//nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {user.login}</td>
                            <td><Link to={"/monblog/"+user.login} className="btn btn-primary">View Blog</Link></td>
                            <td><Link to={"/profil/"+user.login} className="btn btn-success">Edit</Link></td>
                            <td><Link to={"/delete/"+user.login} className="btn btn-danger">Delete</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}