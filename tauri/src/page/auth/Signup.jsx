/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Signup.css';

import toast from 'react-hot-toast';
import { API } from '../../utility/api';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });


    const navigate = useNavigate();

    const { email, password, name } = formData;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

        console.log(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const resData = await res.json();
            console.log(resData);

            if (res.ok) {
                toast.success('User Created successfully!');
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-header">
                    <h1>Sign Up</h1>
                </div>

                <div className="signup-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' onChange={handleChange} />
                </div>

                <div className="signup-field">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name='email' onChange={handleChange} />
                </div>

                <div className="signup-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name='password' onChange={handleChange} />
                </div>

                <button className="signup-button" onClick={handleSubmit}>Sign Up</button>

                <div className="signup-footer">
                    <p className="mb-0 text-muted">
                        Already have an account?{' '}
                        <Link to="/">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
