import React from 'react'

const Navbar = () => {
    return (
        <div className='w-full h-[80px] bg-transparent'>
            <ul className='h-full flex items-center justify-end mr-4'>
                <li className='mx-2 my-1'>
                    <button className="px-6 py-2 border border-[#323232] hover:bg-[#323232] hover:text-white">Login</button>
                </li>
                <li className='mx-2 my-1'>
                    <button className="px-6 py-2 border border-[#323232] hover:bg-[#323232] hover:text-white">Register</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
