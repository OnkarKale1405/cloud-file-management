import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import videoMP4 from "../assets/bubbles.mp4"

// First Step Component
const StepOne = ({ formData, onNext, onChange }) => {

    return (
        <div className='form-control w-[60%] h-[60%] text-[#323232]'>
            <div className='my-2'>
                <h2 className='text-3xl font-bold text-center'>Welcome</h2>
                <p className='text-sm font-semibold text-center'>Please enter your details</p>
            </div>
            {/* Your form fields */}
            <form onSubmit={onNext} className='mt-5'>
                <div className='flex justify-evenly'>
                    <div className="mr-1">
                        <label htmlFor="first-name"  className="block text-sm font-medium leading-6 text-[#323232]">First name</label>
                        <div className="mt-0">
                            <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={formData.firstName} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="ml-1">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#323232]">Last name</label>
                        <div className="mt-0">
                            <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={formData.lastName} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-[#323232]">Username</label>
                    <div className="mt-0">
                        <input id="username" name="username" type="text" autoComplete="username" value={formData.username} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#323232]">Email</label>
                    <div className="mt-0">
                        <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#323232]">Password</label>
                </div>
                <div className="mt-0">
                    <input id="password" name="password" type="password" value={formData.password} onChange={onChange} autoComplete="current-password" className="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-[#323232]">Confirm password</label>
                </div>
                <div className="mt-0">
                    <input id="confirm-password" name="confirm-password" type="password" autoComplete="current-password" className="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                </div>

                <div className='mt-8'>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Next</button>
                </div>
            </form>
            <p className="my-2 text-center text-sm font-semibold text-[#383838]">
                Already have an account? <NavLink to='/login' className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 mx-1">Login</NavLink>
            </p>
        </div>
    );
};

// Second Step Component
const StepTwo = ({ formData, onBack ,onChange,handleAvatarChange}) => {
    const navigate = useNavigate();
    const handleRegister = async () => {
        // Create a new FormData object
        const finalFormData = new FormData();
    
        // Append all the fields from the existing formData object
        Object.entries(formData).forEach(([key, value]) => {
            // Skip appending the avatar field, as we'll handle it separately
            if (key !== 'avatar') {
                finalFormData.append(key, value);
            }
        });
    
        // Append the avatar file
        finalFormData.append('avatar', formData.avatar);
    
        try {
            const response = await fetch('https://cloud-file-management.onrender.com/api/users/register', {
                method: 'POST',
                body: finalFormData, // Pass the final FormData object
            });
            const result = await response.json();
            console.log(result);
            navigate("/login");
        } catch (error) {
            console.log('Error sending data to backend:');
            console.error(error);
        }
    };
    
    return (
        <div className='form-control w-[60%] h-[60%] text-[#323232]'>
            <div className='my-2'>
                <h2 className='text-3xl font-bold text-center'>Additional Information</h2>
                <p className='text-sm font-semibold text-center'>Please provide your avatar and department</p>
            </div>
            <div className="mt-12">
                <div className='my-3'>
                    <label for="avatar" className="block text-md font-medium leading-6 text-gray-900">Avatar</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <div>
                            <svg className="w-20 h-20 text-[#666585]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
                        <label htmlFor="avatar" className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</label>
                    </div>
                </div>
                <div className='my-3'>
                    <label for="user" className="block text-md font-medium leading-6 text-gray-900">User</label>
                    <div className="mt-2">
                        <select id="user" name="user" autocomplete="user-name" value={formData.user} onChange={onChange} className="block w-full rounded-md border-0 px-1 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Teacher</option>
                            <option>Student</option>
                            {/* <option>Mexico</option> */}
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <button onClick={onBack} className="flex w-full justify-center rounded-md bg-[#323232] px-3 py-1.5 my-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Back</button>
                <button onClick={handleRegister} className="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 my-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Sign Up</button>
                <p className="my-2 text-center text-sm font-semibold text-[#383838]">
                    Already have an account? <NavLink to='/login' className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 mx-1">Login</NavLink>
                </p>
            </div>
        </div>
    );
};



// Register Component
const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        avatar:'',
        password:'',
        user:'Teacher'

    });

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleAvatarChange = (e) => {
        const { name, value, files } = e.target;
        // If it's a file input, set the value to the file data
        const fileValue = files ? files[0] : value;
        setFormData({
            ...formData,
            [name]: fileValue,
        });
    };  

    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
            <div className='h-full w-1/2 bg-gray-200 rounded-3xl'>
                    <video src={videoMP4} autoPlay loop muted className="object-cover w-full h-full rounded-3xl"></video>
                </div>
                      <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-start mt-16">
                    {step === 1 ? (
                        <StepOne formData={formData} onNext={handleNext} onChange={handleChange} />
                    ) : (
                        <StepTwo formData={formData} onBack={handleBack} onChange={handleChange} handleAvatarChange={handleAvatarChange} />

                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
