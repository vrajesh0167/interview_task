import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInFail, signInStart, signInSuccess } from '../store/user/userslice';

export default function Signin() {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector((state) => state.user);
    const [success, setSuccess] = useState(null);

    const handlerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());

            const res = await fetch("https://p2carebackend.onrender.com/user/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if(res.ok){
                const data = await res.json();
                dispatch(signInSuccess(data.data));
                setSuccess("User sign in successfully. ")
                navigate('/');
            }else{
                const errorText = await res.text();
                dispatch(signInFail(errorText));
            }
        } catch (error) {
            dispatch(signInFail(error));
        }
    }
    return (
        <div className=' bg-gray-300 h-screen pt-5 flex justify-center items-center'>
            <div className=' border-2 max-w-md md mx-auto p-4 w-full bg-white rounded-lg'>
                <h1 className=' text-center text-slate-600 font-semibold text-2xl my-4'>Sign In</h1>
                <form onSubmit={submitHandler}>
                    <div className=' mb-4'>
                        <label htmlFor="Email" className=' text-lg block mb-2'>Email</label>
                        <input type="email" id='Email' name='Email'  value={formData.Email} onChange={handlerChange} required  className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="password" className=' text-lg block mb-2'>Password</label>
                        <input type="password" id='Password' name='Password'  value={formData.Password} onChange={handlerChange} required  className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' text-center mt-5'>
                        <button type='submit' disabled={loading} className=' bg-sky-500 text-white py-2 px-4 border-2 border-sky-500 rounded-lg hover:bg-white hover:text-sky-500 transition'>{loading ? "Signing...": "Sign In"}</button>
                    </div>
                </form>
                <p className=' text-center text-rose-600 text-base'>{error ? error : '' }</p>
                <p className=' text-center text-green-600 text-base'>{success ? success : '' }</p>
                <p className=' mt-5 text-center text-base'>Don't have an account <Link to={'/signup'} className=' text-base font-semibold text-sky-600 hover:text-blue-400'>Sign up</Link></p>
            </div>
        </div>
    )
}
