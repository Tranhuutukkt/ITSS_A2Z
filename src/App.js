import './App.css';
import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import Posts from "./components/posts";
import Chat from "./components/chat";
import auth from "./services/authService";
import MyProfile from "./components/myProfile";
import Admin from "./components/admin";

function App() {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(auth.getCurrentUser());
    }, []);

  return (
    <React.Fragment>
      <NavBar user={user}/>
      <main className='container-fluid'>
        <Switch>
            <Route path='/register' component={RegisterForm}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/posts' component={Posts}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/me' component={MyProfile}/>
            <Route path='/admin' component={Admin}/>
            <Redirect to='/posts'/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
