import React, {useState, useEffect} from "react";
import {getProfile, profileEdit} from "../services/userService";
import {profileSchema} from "../utils/userSchema";
import ProfileImage from "./profileImage";
import Joi from "joi";
import {useHistory} from "react-router-dom";
import Form from "./form";

class ProfileEdit extends Form {
    state = {
        data: {name: '', class: '', faculty: '', studentCode:'', gender: '', email: ''},
        errors: {}
    }

    schema = profileSchema;

    async componentDidMount() {
        const userInfo = await getProfile();
        const newUser = {...this.state.data};
        Object.keys(this.state.data).forEach(k => userInfo[k] ? newUser[k] = userInfo[k] : '');
        this.setState({data: newUser});
    }

    doSubmit = async () => {
        await profileEdit(this.state.data);
        this.props.history.push('/me/profile');
    }

    render(){
        const list = Object.keys(profileSchema)
            .filter(l => l !== 'email')
            .map(l => {
            const name = l.charAt(0).toUpperCase() + l.slice(1);
            return {label: l, name: name.replace(/[A-Z]/g, ' $&').trim()};
            });
        const user = this.state.data;

        return(
            <div data-aos="fade-up" className="form-block">
                <ProfileImage user={user}/>
                <form className='form' onSubmit={this.handleSubmit}>
                    {list.map(l => (
                            l.label === 'gender' ?
                                <div key={l.label}>
                                    {this.renderSelect(l.label, l.name, [{id: true, name: "male"}, {
                                        id: false,
                                        name: 'female'
                                    }])}
                                </div> :
                                <div key={l.label}>
                                    {this.renderInput(l.label, l.name, 'text')}
                                </div>
                    ))}
                    {this.renderButton('Save')}
                </form>
            </div>
        )

    }
}


export default ProfileEdit;
