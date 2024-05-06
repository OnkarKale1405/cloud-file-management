import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    // State to hold form data and validation errors
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    // Regex patterns for email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Function to handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Clear the error message for the field being edited
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        setFormData({ ...formData, [name]: value });
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Validation
        const validationErrors = {};
        if (!formData.email || !emailRegex.test(formData.email)) {
            validationErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password || !passwordRegex.test(formData.password)) {
            validationErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
        }

        // If there are validation errors, set the state and return
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const FinalFormData={
            email:formData.email,
            password:formData.password
        }
        console.log(FinalFormData);
        // If no validation errors, send data to the backend
        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify(FinalFormData), // Stringify the object
            });

            const result = await response.json();
            console.log(result);
            const accessToken = result.data.accessToken ;
            const username = result.data.user.username ;
            const role = result.data.user.role ;
            const avatar = result.data.user.avatar ;
            setAuth({ email: formData.email, username, accessToken, role, avatar });

            if (auth.accessToken) {
                navigate('/dashboard/files');
            }


        } catch (error) {
            if (error.response) {
                // If the backend returns an error response, extract and display errors
                const backendErrors = error.response.data;
                const combinedErrors = { ...validationErrors };
                for (const key in backendErrors) {
                    combinedErrors[key] = backendErrors[key];
                }
                setErrors(combinedErrors);
            } else {
                console.error('Error:', error); // Handle other types of errors
            }
        }
    };

    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
                <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-center">
                    <div className='form-control w-[60%] h-[60%] text-[#323232]'>
                        <div className='my-4'>
                            <h2 className='text-3xl font-bold text-center'>Welcome back</h2>
                            <p className='text-sm font-semibold text-center'>Please enter your details</p>
                        </div>
                        <form onSubmit={handleSubmit} className='mt-10'>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#323232]">Email</label>
                                <div className="mt-0">
                                    <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleInputChange} className={`block w-full rounded-lg border-0 px-1 py-1.5 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''}`} />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className='mt-2'>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#323232]">Password</label>
                                </div>
                                <div className="mt-0">
                                    <input id="password" name="password" type="password" autoComplete="current-password" value={formData.password} onChange={handleInputChange} className={`block w-full rounded-lg border-0 px-1 py-1.5 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`} />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <div className="text-sm flex justify-end m-2">
                                    <a href="#" className="font-bold text-[#383838] hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>

                            <div className='mt-8'>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Login</button>
                            </div>
                            <p className="my-2 text-center text-sm font-semibold text-[#383838]">
                                Don't have an account?
                                <NavLink to="/register" className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 mx-1">Sign Up</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
                <div className='h-full w-1/2 bg-gray-200 rounded-3xl'>

                </div>
            </div>
        </div>
    );
};

export default Login;
