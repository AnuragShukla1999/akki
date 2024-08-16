/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Signin.css'
import { AuthContext } from '../../context/ConfigContext';

import toast from 'react-hot-toast';

const Signin = () => {

    const { setUser } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        touched: false
    });

    const [loading, setLoading] = useState(false);


    const handleBlur = () => { 
        if (userData.email.trim() === '' || userData.password.trim() === '') {
            setUserData({
                ...userData,
                touched: true
            });
        }
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://akki-1ni7.onrender.com/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resData = await response.json();

            if (resData.validUser) {
                setUser(resData.validUser);
                localStorage.setItem('user', JSON.stringify(resData.validUser));
                toast.success('Signed in successfully!');
                navigate("/dashboard");
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            console.error('Signin error:', error);
            toast.error('An error occurred: ${error.message}');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="signin">
            <div className="signin-container">
                <div className="signin-header">
                    <h1>Sign In</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="signin-field">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={userData.email}
                        />
                        {userData.touched && userData.email.trim() === "" && (
                            <small className="text-danger form-text">Please provide email</small>
                        )}
                    </div>

                    <div className="signin-field">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={userData.password}
                        />
                        {userData.touched && userData.password.trim() === "" && (
                            <small className="text-danger form-text">Please provide password</small>
                        )}
                    </div>

                    <button className="signin-button" type="submit">
                        {loading ? "Loading..." : "Signin"}
                    </button>
                </form>

                <div className="signin-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup">Signup</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin
