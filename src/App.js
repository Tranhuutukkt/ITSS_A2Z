import './App.css';
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";

function App() {
  return (
    <React.Fragment>
      <main className='container-fluid'>
        <Switch>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/logout' component={Logout}/>
          {/*<Route path='/me' component={MyProfile}/>*/}
          <Redirect to='/login'/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
