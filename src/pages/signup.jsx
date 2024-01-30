import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const [formData, setFormdata] = useState({
        Name: '',
        Username: '',
        Email: '',
        Password: ''
    });
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormdata({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const submithandler = async (e) =>{
        e.preventDefault();

        try {
            setLoading(true);
            const res = await  fetch("https://p2carebackend.onrender.com/user/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            })
            
            if(res.ok){
                setSuccess("User create successfully.");
                setLoading(false);
                navigate('/signin');
            }else{
                const errorText = await res.text();
                setErrors(errorText);
                setLoading(false);
            }
        } catch (error) {
            setErrors("SIgn up error:- ",error);
            setLoading(false);
        }
    }
    return (
        <div className=' bg-gray-300 h-screen pt-5 flex justify-center items-center'>
            <div className=' border-2 max-w-md md mx-auto p-4 w-full bg-white rounded-lg'>
                <h1 className=' text-center text-slate-600 font-semibold text-2xl my-4'>Sign Up</h1>
                <form method='post' onSubmit={submithandler}>
                    <div className=' mb-4'>
                        <label htmlFor="Name" className=' text-lg block mb-2'>Name</label>
                        <input type="text" id='Name' name='Name' value={formData.Name} required className=' w-full p-2 rounded-lg focus:outline-none border-2' onChange={handleChange}/>
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Username" className=' text-lg block mb-2'>UserName</label>
                        <input type="text" id='Username' name='Username' value={formData.Username} required  className=' w-full p-2 rounded-lg focus:outline-none border-2' onChange={handleChange}/>
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Email" className=' text-lg block mb-2'>Email</label>
                        <input type="email" id='Email' name='Email' value={formData.Email} required  className=' w-full p-2 rounded-lg focus:outline-none border-2' onChange={handleChange} />
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Password" className=' text-lg block mb-2'>Password</label>
                        <input type="Password" id='Password' name='password' value={formData.Password} required  className=' w-full p-2 rounded-lg focus:outline-none border-2' onChange={handleChange}/>
                    </div>
                    <div className=' text-center mt-5'>
                        <button type='submit' disabled={loading} className=' bg-sky-500 text-white py-2 px-4 border-2 border-sky-500 rounded-lg hover:bg-white hover:text-sky-500 transition'>{loading ? 'signin...' : 'Sign Up'}</button>
                    </div>
                </form>
                <p className=' text-center text-rose-600 text-base'>{errors ? errors : '' }</p>
                <p className=' text-center text-green-600 text-base'>{success ? success : '' }</p>
                <p className=' mt-5 text-center text-base'>Already have an account <Link to={'/signin'} className=' text-base font-semibold text-sky-600 hover:text-blue-400'>Sign in</Link></p>
            </div>
        </div>
    )
}
