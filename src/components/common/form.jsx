import React, {Component} from "react";
import Joi from "joi";

class Form extends Component{
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const schema = Joi.object(this.schema);
        const {error} = schema.validate(this.state.data, {abortEarly: false});
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message.split('"');
        return errors;
    }

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = Joi.object({[name]: this.schema[name]});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message.split('"') : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        console.log(errors);
        this.doSubmit();
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    }

    renderButton(label){
        return (
            <button
                disabled={this.validate()}
                className='btn btn-primary'
                type='submit'
            >{label}
            </button>
        )
    }

    renderInput(name, label, type = 'text'){
        const {data, errors} = this.state;
        return (
            <div className='mb-3 mt-3'>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    name={name}
                    className='form-control'
                    type={type}
                    value={data[name]}
                    label={label}
                    onChange={this.handleChange}
                />
                {errors[name] &&
                    <div className='alert-danger alert'>
                        <i className="fa-solid fa-circle-exclamation me-3"></i>
                        {errors[name]}
                    </div>}
            </div>
        );
    }

    renderSelect(name, label, options){
        const {data, errors} = this.state;

        return (
            <div className='mb-3'>
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    id={name}
                    className='form-control form-select'
                    onChange={this.handleChange}
                    value={data[name]}
                >
                    <option defaultValue>Choose an option</option>
                    {options.map(op => (
                        <option key={op.id} value={op.id}>{op.name}</option>
                    ))}
                </select>
                {errors[name] && <div className='alert alert-danger'>{errors[name]}</div>}
            </div>
        )
    }
}

export default Form;












