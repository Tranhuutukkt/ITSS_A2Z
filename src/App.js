import './App.css';
import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import RegisterForm from "./components/Login/registerForm";
import LoginForm from "./components/Login/loginForm";
import Logout from "./components/Login/logout";
import NavBar from "./components/common/navBar";
import Posts from "./components/Post/posts";
import Chat from "./components/Chat/chat";
import auth from "./services/authService";
import MyProfile from "./components/Profile/myProfile";
import Admin from "./components/Admin/admin";
import FileUpload from "./components/common/fileUpload";

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
            <Route path='/posts' render={() => <Posts user={user}/>}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/me' render={() => <MyProfile user={user}/>}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/storage' component={FileUpload}/>
            <Redirect to='/posts'/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
