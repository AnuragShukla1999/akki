/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import '../../styles/Signin.css'
import { AuthContext } from '../../context/ConfigContext';

import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// import { invoke } from '@tauri-apps/api/tauri';
// const { invoke } = window.__TAURI__.tauri;

const Signin = () => {

    const { setUser, setIsAuthenticated } = useContext(AuthContext);

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
            const response = await fetch('http://localhost:7000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            // // Call the Tauri backend command
            // const response = await invoke('signin', {
            //     email: userData.email,
            //     password: userData.password
            // });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resData = await response.json();

            if (resData.validUser) {
                setUser(resData.validUser);
                localStorage.setItem('user', JSON.stringify(resData.validUser));
                setIsAuthenticated(true);
                toast.success('Signed in successfully!');
                console.log('Navigating to /dashboard');
                setLoading(false);
                navigate('/dashboard');
                console.log("Hello")
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            console.error('Signin error:', error);
            setLoading(false);
            toast.error(`An error occurred: ${error.message}`);
        }
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     // Define a timeout promise
    //     const timeoutPromise = new Promise((_, reject) =>
    //         setTimeout(() => reject(new Error('Request timed out')), 60000) // 60000 ms = 60 seconds
    //     );

    //     // Define the fetch promise
    //     const fetchPromise = fetch('https://akki-1ni7.onrender.com/api/signin', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(userData),
    //         credentials: 'include'
    //     });

    //     try {
    //         // Use Promise.race to handle the first promise that settles
    //         const response = await Promise.race([fetchPromise, timeoutPromise]);

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const resData = await response.json();

    //         if (resData.validUser) {
    //             setUser(resData.validUser);
    //             localStorage.setItem('user', JSON.stringify(resData.validUser));
    //             setIsAuthenticated(true);
    //             toast.success('Signed in successfully!');
    //             console.log('Navigating to /dashboard');
    //             setLoading(false);
    //             navigate('/dashboard');
    //             console.log("Hello")
    //         } else {
    //             toast.error('Invalid email or password.');
    //         }
    //     } catch (error) {
    //         console.error('Signin error:', error);
    //         setLoading(false);
    //         toast.error(`An error occurred: ${error.message}`);
    //     }
    // };



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
                            id="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={userData.email}
                            autoComplete="email"
                        />
                        {userData.touched && userData.email.trim() === "" && (
                            <small className="text-danger form-text">Please provide email</small>
                        )}
                    </div>

                    <div className="signin-field">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={userData.password}
                            autoComplete="current-password"
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
