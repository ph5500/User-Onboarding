import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";

// const formSchema = yup.object().shape({
//     name: yup.string().required("Name is a required field."),
//     email: yup
//         .string()
//         .email("Must be a valid email address.")
//         .required("Must include email address."),
//     terms: yup.boolean().oneOf([true], "please agree to terms of use"),
//     positions: yup.string(),
//     motivation: yup.string().required("must include why you'd like to join")
// });



export default function Form(props) {
    console.log(props);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",

    });




    const formSubmit = event => {
        const inputChanged = event.target.name
        const newValueInput = event.target.value
    }




    // const validateChange = e => {
    //     yup
    //         .reach(formSchema, e.target.name)
    //         .validate(e.target.value)
    //         .then(valid => {
    //             setErrors({
    //                 ...errors,
    //                 [e.target.name]: err.errors[0]
    //             });
    //         });
    // };
    return (
        <form>
            <label> Name
                <input
                    name='name'
                    type='text' />

            </label>

            <label> Email
                <input
                    name='email'
                    type='text' />
            </label>

            <label> Password
                <input
                    name='password'
                    type='text' />
            </label>



            <label htmlFor="terms" className="terms">
                <input
                    type="checkbox"
                    name="terms"
                // checked={formState.terms}
                // onChange={inputChange}
                />
                Terms and Conditions
      </label>
            <label>
                <input type="submit" value="Submit"></input>
            </label>

            {/* <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        /> */}

            {/* <form onSubmit={formSubmit}> */}
        </form>
    )
}


