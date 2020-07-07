import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import EditUser from "./components/edit-user.component";
import UpdateUser from "./components/update-user.component";
import FollowingUser from "./components/following-user.component"
import ListUser from "./components/list-user.component";
import DeleteUser from "./components/delete-user.component";
import BlogUser from "./components/blog-user.component";
import EditPost from "./components/edit-post.component";
import PostsList from "./components/list-post.components";
import CreatePost from "./components/create-post.component";
import CreateComment from "./components/create-comment.component";
import UpdatePost from './components/update-post.component';
import DeletePost from "./components/delete-post.component"
import Loggout from "./components/logout-user.component";
import Index from "./components/index.component";

function App() {
  const login=localStorage.getItem("login")
  return (
  
    <Router>
    <div className="container">
  <Navbar  bg="primary" variant="dark" expand="lg">
  <Navbar.Brand href="/">MICCROBLOGGOS</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Connect" id="basic-nav-dropdown">
        <NavDropdown.Item href="/create">Register</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href={`/monblog/${login}`} >My Blog</Nav.Link>
      <NavDropdown title="List" id="basic-nav-dropdown">
        <NavDropdown.Item href="/users">Users'list</NavDropdown.Item>
        <NavDropdown.Item href="/allposts">Post'list</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link href="/logout">Log out User</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
               
                {/* <li className="navbar-item">
                  <Link to="/createpost" className="nav-link">New post</Link>
                </li> */}
              
                {localStorage.getItem('login')}
          <br/>
      <h2>MICCROBLOGGOS</h2>
      {/* <Index/> */}
    <Route path="/users" exact component={ListUser}/>
    <Route path="/create" component={CreateUser}/>
    <Route path="/login" component={LoginUser}/>
    <Route path="/profil/:login" exact component={EditUser}/>
    <Route path="/update/:login" component={UpdateUser}/>
    <Route path={`/following/:login/${localStorage.getItem('login')}`} component={FollowingUser}/>
    <Route path="/delete/:login" component={DeleteUser}/>  
    <Route path="/monblog/:login" component={BlogUser}/>
    <Route path="/allposts" component={PostsList}/>
    <Route path="/createpost" component={CreatePost}/>
    <Route path="/detail/:id" component={EditPost}/>
    <Route path="/updatepost/:id" component={UpdatePost}/>
    <Route path="/deletepost/:id" component={DeletePost}/> 
    <Route path="/comment/:id" component={CreateComment}/>
    <Route path="/logout" component={Loggout}/>
    </div>
    </Router>
  );
}

export default App;
