import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="h-screen bg-gradient-to-br flex flex-col"
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #FDB2D0 0%,#A2D2FF 50%, #F9DBE7 80%, #F4DDEF 100%)',
            }}>
            <Navbar />
            <div className="flex flex-grow w-full h-full">
                <div className="w-[60%] h-full flex justify-center items-center">
                    <div className="w-[90%] h-[60%] text-[#323232] flex flex-col justify-center">
                        <div className='hero-text flex flex-col'>
                            <span className='text-6xl font-bold my-2'>Share your files</span>
                            <span className='text-6xl font-bold my-4'>in
                                <span className='px-4 bg-white mx-1'
                                    style={{
                                        backgroundImage: 'linear-gradient(to right, #C2D2F4 0%, #F1E6EE 100%)'
                                    }}>one place.</span>
                            </span>
                            <p className='w-[80%] font-semibold my-2 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus et blanditiis consequuntur aperiam beatae eaque, dolore facere distinctio magnam iusto non numquam accusamus, error, similique cum dolor accusantium deserunt dolorum.</p>
                            <div className='action-buttons my-4'>
                                <NavLink to="/login">
                                    <button className="px-6 py-2 mx-1 border border-[#323232] hover:bg-[#323232] hover:text-white">Login</button>
                                </NavLink>
                                <NavLink to="/register">
                                    <button className="px-6 py-2 mx-1 border border-[#323232] hover:bg-[#323232] hover:text-white">Register</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] h-full grid grid-cols-2 grid-rows-2" style={{ gridTemplateColumns: '60% 40%' }}>
                    <div className="flex-col bg-transparent">
                        <div className="w-full h-1/2 bg-gradient-to-b from-[#B3D9FD] to-transparent rounded-bl-full rounded-br-full"
                            style={{
                                backgroundImage: 'linear-gradient( to bottom, #E1DAEC 0%, #C8C4E7 60% )'
                            }}>
                        </div>
                        <div className='w-full h-1/2 rounded-tl-full rounded-tr-full'
                            style={{
                                backgroundImage: "linear-gradient(140deg, #EEE7DD 0%, #C8C5F4 80%)"
                            }}></div>
                    </div>
                    <div className="bg-transparent">
                        <div className='h-full w-full rounded-tr-full rounded-br-full'
                            style={{
                                backgroundImage: 'linear-gradient(to bottom , #7ABEFF 0%, #C7C4F3 50%)'
                            }}></div>
                    </div>
                    <div className=" bg-transparent relative">
                        <div className="absolute bottom-0" style={{
                            borderBottom: '100px solid white',
                            borderRight: '50px solid transparent',
                            borderLeft: '50px solid transparent'
                        }}></div>
                    </div>
                    <div style={{
                        backgroundImage: 'linear-gradient(to bottom , #ECC1DC 0%, #F4DBDE 50%)'
                    }}></div>
                </div>
            </div>
        </div >
    );
};

export default Landing;


// top left : #FDB2D0
// top right: #A2D2FF
// bottom left: #F9DBE7
// bottom right: #F4DDEF