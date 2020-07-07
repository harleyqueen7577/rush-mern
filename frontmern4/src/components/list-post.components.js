import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class PostsList extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { posts: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        axios.get('http://localhost:4242/api/allposts')
            .then(response => {
                this.setState({ posts: response.data });
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
                <h3>Posts List</h3>
                <table className="table table-striped" style={{ marginTop: 30 }} >
                    <thead>
                    <tr>
                        <th>Author</th>
                        <th>title</th>
                        <th>Components</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.posts.map((post) =>//nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {post.login}</td>
                            <td>{post.title}</td>
                            <td>{post.contenu}</td>
                            <td><Link to={"/detail/"+post._id} className="btn btn-primary">Edit</Link></td>
                            <td><Link to={"/deletepost/"+post._id} className="btn btn-danger">Delete</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}