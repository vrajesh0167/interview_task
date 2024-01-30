import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

export default function Home() {
    const [showDropDown, setShowDropDown] = useState(false);
    const toggleHandler = () => {
        setShowDropDown(!showDropDown);
    }
    const location = useLocation();
    const isSignupPage = location.pathname === '/signup';
    return (
        <nav className=' p-3 bg-slate-500'>
            <div className=' container mx-auto flex justify-between items-center'>
                <div className=' text-white font-semibold text-2xl'>
                    Vakratund
                </div>
                <div className=' relative ml-auto pe-2'>
                    <button onClick={toggleHandler} className=' text-white'> &#9660; </button>
                    {showDropDown ? (
                        <div className=' absolute right-0 bg-white rounded-lg shadow-lg'>
                            <ul>
                                <li>
                                    <button className=' text-gray-600  block px-4 py-2 bg-gray-300 w-full'>Edit Profile</button>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <button className=' text-gray-600  block px-4 py-2 bg-gray-300 w-full'>Delete Profile</button>
                                </li>
                            </ul>
                        </div>
                    ) : ''}
                </div>
                <div className=' flex gap-3'>
                    <NavLink to={'/profile'} className=' text-white text-xl font-semibold'>Profile</NavLink>
                    {
                        isSignupPage ? (
                            <NavLink to={'/signup'} className=' text-white text-xl font-semibold'>Signup</NavLink>
                        ) : (
                            <NavLink to={'/signin'} className=' text-white text-xl font-semibold'>Signin</NavLink>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
