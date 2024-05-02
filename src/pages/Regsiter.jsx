import React from 'react'
import { NavLink } from 'react-router-dom'

const Regsiter = () => {
    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
                <div className='h-full w-1/2 bg-gray-200 rounded-3xl'>

                </div>
                <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-start mt-16">
                    <div className='form-control w-[60%] h-[60%] text-[#323232]'>
                        <div className='my-2'>
                            <h2 className='text-3xl font-bold text-center'>Welcome</h2>
                            <p className='text-sm font-semibold text-center'>please enter your details</p>
                        </div>
                        <form action="#" className='mt-5'>
                            <div className='flex justify-evenly'>
                                <div class="mr-1">
                                    <label for="first-name" class="block text-sm font-medium leading-6 text-[#323232]">First name</label>
                                    <div class="mt-0">
                                        <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div class="ml-1">
                                    <label for="last-name" class="block text-sm font-medium leading-6 text-[#323232]">Last name</label>
                                    <div class="mt-0">
                                        <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="username" class="block text-sm font-medium leading-6 text-[#323232]">Username</label>
                                <div class="mt-0">
                                    <input id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-[#323232]">Email</label>
                                <div class="mt-0">
                                    <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm font-medium leading-6 text-[#323232]">Password</label>
                            </div>
                            <div class="mt-0">
                                <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>

                            <div class="flex items-center justify-between">
                                <label for="confirm-password" class="block text-sm font-medium leading-6 text-[#323232]">Confirm password</label>
                            </div>
                            <div class="mt-0">
                                <input id="confirm-password" name="confirm-password" type="password" autocomplete="current-password" required class="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>

                            <div className='mt-8'>
                                <button type="submit" class="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Sign Up</button>
                            </div>
                            <p class="my-2 text-center text-sm font-semibold text-[#383838]">
                                Already have an account?
                                <NavLink to='/login' className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 mx-1">Login</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Regsiter
