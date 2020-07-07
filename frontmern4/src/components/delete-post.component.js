import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

 

export default class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
   

    delete() {
        const id=this.props.match.params.id
        axios.get('http://localhost:4242/api/deletepost/'+id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <p>
                    Confirmez vous le delete de ce post?
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </p>
                <p>
                   Si non, retour au post
        
                   <Link to={"/allposts"} className="btn btn-primary">Tous les posts</Link>
               </p>
                
            </div>
            
            
        )
      }
    }
    
