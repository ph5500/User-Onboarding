import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().required("Please enter an email address"),
    password: yup.string().required("password must be included"),
    terms: yup.boolean().oneOf([true], "You must agree to terms!"),
    motivation: yup.string().required("must include why you'd like to join")
});



export default function Form(props) {
    console.log(props);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
        motivation: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
        motivation: "",

    });

    const [buttonDisabled, setButtonDisabled] = useState(true);


    const [users, setUsers] = useState([]);


    useEffect(() => {
        /* We pass the entire state into the entire schema, no need to use reach here. 
        We want to make sure it is all valid before we allow a user to submit
        isValid comes from Yup directly */
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = change => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
            .reach(formSchema, change.target.name)
            .validate(change.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [change.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [change.target.name]: err.errors
                });
            });
    };
    //below we will include the axios post for our fake data


    const formSubmit = event => {
        event.preventDefault();
        axios
            .post('https://reqres.in/api/user', formState)
            .then(response => {
                setUsers(response.data);
                // console.log('success', users);

                setFormState({
                    name: '',
                    email: '',
                    password: '',
                    terms: '',
                    motivation: '',
                })
            }).catch(err => {
                console.log(err.response);
            })
        // const inputChanged = event.target.name
        // const newValueInput = event.target.value
    }

    //input changes with persist below



    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };



    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={formState.name}
                    onChange={inputChange}>
                </input>
                {errors.email.length > 0 ? (<p className="error">{errors.name}</p>) : null}
            </label>
            <br></br>

            {/* adds ability to have input to email box */}
            <label htmlFor="email">
                Email
                <input
                    id='email'
                    name='email'
                    type='text'
                    value={formState.email}
                    onChange={inputChange}>
                </input>
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>
            <br></br>
            <br></br>
            {/* adds ability to have input to password box */}
            <label htmlFor="password">
                Password
                <input
                    id='password'
                    name='password'
                    type='text'
                    value={formState.password}
                    onChange={inputChange}>
                </input>
                {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}
            </label>
            <br></br>
            <br></br>


            <br></br>

            <label htmlFor="motivation">
                Why would you like to help?
        <textarea
                    name="motivation"
                    value={formState.motivation}
                    onChange={inputChange}
                />
                {errors.motivation.length > 0 ? (
                    <p className="error">{errors.motivation}</p>
                ) : null}
            </label>
            <br></br>
            <br></br>
            <label htmlFor="positions">
                What would you like to help with?
        <select id="positions" name="positions" onChange={inputChange}>
                    <option value="Manager">Manager</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Head Coach">Head Coach</option>
                    <option value="Assistant Coach">Assistant Coach</option>
                    <option value="Trainer">Trainer</option>
                </select>
            </label>
            <br></br>
            <br></br>
            <label htmlFor="terms" className="terms">
                <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                Terms and Conditions
      </label>

            <pre>{JSON.stringify(users, null, 2)}</pre>

            {/* <label>
                <input type="submit" value="Submit"></input>
            </label> */}
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}
