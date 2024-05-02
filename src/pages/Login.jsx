import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
                <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-center">
                    <div className='form-control w-[60%] h-[60%] text-[#323232]'>
                        <div className='my-4'>
                            <h2 className='text-3xl font-bold text-center'>Welcome back</h2>
                            <p className='text-sm font-semibold text-center'>please enter your details</p>
                        </div>
                        <form action="#" className='mt-10'>
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-[#323232]">Email</label>
                                <div class="mt-0">
                                    <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div class="flex items-center justify-between">
                                    <label for="password" class="block text-sm font-medium leading-6 text-[#323232]">Password</label>
                                </div>
                                <div class="mt-0">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                                <div class="text-sm flex justify-end m-2">
                                    <a href="#" class="font-bold text-[#383838] hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>

                            <div className='mt-8'>
                                <button type="submit" class="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Login</button>
                            </div>
                            <p class="my-2 text-center text-sm font-semibold text-[#383838]">
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
    )
}

export default Login
