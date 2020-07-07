import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'


export default class BlogUser extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], login :"", isMyBlog: false };
    }
    componentDidMount() {
        this.setState({ login: this.props.match.params.login });
       // console.log(this.props.match.params.login );
        let login = this.props.match.params.login;
        let url = 'http://localhost:4242/api/monblog/'+login;
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
        //if(localStorage.getItem('login')){
          //  console.log(localStorage.getItem('login') );
           // console.log(this.state.login);
            if(localStorage.getItem('login') == login ){
                this.setState({ isMyBlog: true });
            }
        }
    //}
    render() {
        var me=localStorage.getItem('login')
        return (
            <div>
                 <div className="form-group">
                <Link to={"/profil/"+this.state.login} className="btn btn-success">View my profil</Link>
                 <Link to="/createpost" className="btn btn-primary">New post</Link>
                 <Link to={"/following/" + this.state.login+"/"+me} className="btn btn-danger">Following this user</Link>
                 </div>
                <h3>Posts of user {this.state.login }  { String(this.state.isMyBlog ) } </h3>
                    {this.state.posts.map((post) =>
                    <Card  border="primary">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                      {post.content}
                      </Card.Text>
                      <footer className="blockquote-footer">
        Write by in <cite title="Source Title">{post.login}</cite>
                   </footer>
                      <Button href={"/detail/"+post._id} >View my post</Button>
                    </Card.Body>
                  </Card>
                    )}
            </div>
        )
    }
}

//> db.posts.insert({ login:"dodop", title:"coucou", contenu:"je veux tester"})
