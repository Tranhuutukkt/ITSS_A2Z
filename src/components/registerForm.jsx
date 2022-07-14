import React from "react";
import auth from "../services/authService";
import Form from "./form";
import {register} from "../services/userService";
import {registerSchema} from "../utils/userSchema";

class RegisterForm extends Form{
    state = {
        data: {email: '', password: '', name: '', role: ''},
        errors: {}
    }

    schema = registerSchema;

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    }

    option = [{id: 1, name: 'student'}, {id: 2, name: 'teacher'}];

    render() {
        return (
            <div data-aos="fade-up" className="form-block">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit} className='form'>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('name', 'Full name')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderSelect('role', 'You are ', this.option)}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;