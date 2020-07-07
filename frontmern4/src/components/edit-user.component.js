import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [],login:"", isMyBlog: false };
    }
    componentDidMount() {
        this.setState({ login: this.props.match.params.login });
       // console.log(this.props.match.params.login );
        let login = this.props.match.params.login;
        let url = 'http://localhost:4242/api/profil/'+login;
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({ users: response.data });
               // localStorage.setItem('login',this.state.login)
            })
            .catch(function (error) {
                console.log(error);
            });
      //  if(localStorage.getItem('login')){
        //    console.log(localStorage.getItem('login') );
         //   console.log(this.state.login);
            if(localStorage.getItem('login') == login ){
                this.setState({ isMyBlog: true });
            }
        }
    //}
    render() {
        const { users } = this.state; 
        return (
            <div>
                <h3>My profil of user {this.state.login }  { String(this.state.isMyBlog ) } </h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>My login</th>
                        <th>My Email</th>
                        <th>My password</th>
                        <th>Follows</th>
                        <th>Followings</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(object =>(
                        <tr><th key={object.uid}>{object.login}</th>
                             <td key={object.uid}>{object.email}</td>
                             <td key={object.uid}>{object.password}</td>
                            {object.follows.map(follow => (
                                  <td key={follow.uid}>{follow.login}</td>
                            ))}
                             {object.followings.map(following => (
                                  <td key={following.uid}>{following.login}</td>
                            ))}
                            <td><Link key={object.uid} to={"/monblog/"+object.login} className="btn btn-primary">View Blog</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="form-group">
                <Link to={"/update/"+this.state.login} className="btn btn-primary" >Update profil</Link>
                <Link to={"/delete/"+this.state.login} className="btn btn-danger">Delete</Link>
                    </div>
            </div>
        )
    }
}
