import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'


export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        // console.log(this.props.match.params.login );
        let id = this.props.match.params.id;
        let url = 'http://localhost:4242/api/post/' + id;
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({ posts: response.data });

                // localStorage.setItem('login',this.state.login)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    //}
    render() {
        const { posts } = this.state;
        return (
            <div>
                <h3>My detail of Post</h3>
                
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(object => (
                            <tr><th key={object.uid}>{object.login}</th>
                                <td key={object.uid}>{object.title}</td>
                                <td key={object.uid}>{object.contenu}</td>
                                {object.comments.map(comment => (
                                    <td key={comment.uid}>{comment.contenu} by @{comment.login} </td>

                             ))}
                                <td><Link key={object.uid} to={"/monblog/" + object.login} className="btn btn-primary">Author's Blog</Link></td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
                <div className="form-group">
                    <td><Link to={"/comment/" + this.state.id} className="btn btn-primary">Create a comment</Link></td>
                    <td><Link to={"/updatepost/" + this.state.id} className="btn btn-primary">Update the post</Link></td>
                    <td><Link to={"/deletepost/" + this.state.id} className="btn btn-danger">Delete this post</Link></td>

                </div>
            </div>
        )
    }
}