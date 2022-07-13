import React from "react";
import Form from "./form";
import {schema} from "../utils/userSchema";
import auth from "../services/authService";
import {Link, Redirect} from "react-router-dom";

class LoginForm extends Form{
    state = {
        data: {email: '', password: ''},
        errors: {}
    }

    schema = schema;

    doSubmit = async () => {
        const {data} = this.state;
        try {
            await auth.login(data.email, data.password);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }
        catch (ex){
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                errors.password = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        if (auth.getCurrentUser()) return <Redirect to='/'/>

        return (
            <div data-aos="fade-up" className="form-block">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit} className='form'>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('password', 'Password', 'password')}
                    <p>Don't have an account? <Link to='/register'>Register here!</Link></p>

                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;