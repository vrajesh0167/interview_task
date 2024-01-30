import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess, updateFail, updateStart, updateSuccess } from '../store/user/userslice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    // console.log(currentUser);

    const defaultName = currentUser ? currentUser.Name : '';
    const defaultUsername = currentUser ? currentUser.Username : '';
    const defaultEmail = currentUser ? currentUser.Email : '';
    const defaultPassword = currentUser ? currentUser.Password : '';

    const [formData, setFormData] = useState({
        Name: defaultName,
        Username: defaultUsername,
        Email: defaultEmail,
        Password: defaultPassword,
    });
    // console.log("name:- ",formData.Name);
    const [success, setSuccess] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const updateHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateStart());
            const res = await fetch(`https://p2carebackend.onrender.com/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: currentUser.token
                },
                body: JSON.stringify({ ...formData, }),
            })
            if (res.ok) {
                const update = await res.json();
                dispatch(updateSuccess({...update.udata, ...currentUser}))
                setSuccess("Your profile update successfully.")
                // console.log(update);
            } else {
                const error = await res.text();
                dispatch(updateFail(error));
            }
        } catch (error) {
            dispatch(updateFail(error));
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        try {
            setDeleting(true);
            const res = await fetch(`https://p2carebackend.onrender.com/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: currentUser.token
                },
            })
            if (res.ok) {
                const deleteUser = await res.json();
                dispatch(signOutSuccess());
                setSuccess("Your profile delete successfully.")
                console.log(deleteUser);
                setDeleting(false);
                navigate('/');
            } else {
                const error = await res.text();
                console.log(error);
                setDeleting(false);
            }
        } catch (error) {
            console.log(error);
            setDeleting(false);
        }
    }
    return (
        <div className=' bg-gray-300 h-screen pt-5 flex justify-center items-center'>
            <div className=' border-2 max-w-md md mx-auto p-4 w-full bg-white rounded-lg'>
                <h1 className=' text-center text-slate-600 font-semibold text-2xl my-4'>Profile</h1>
                <form method='post' onSubmit={updateHandler}>
                    <div className=' mb-4'>
                        <label htmlFor="Name" className=' text-lg block mb-2'>Name</label>
                        <input type="text" id='Name' name='Name' defaultValue={formData.Name} onChange={handlerChange} className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Username" className=' text-lg block mb-2'>UserName</label>
                        <input type="text" id='Username' name='Username' defaultValue={formData.Username} onChange={handlerChange} className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Email" className=' text-lg block mb-2'>Email</label>
                        <input type="email" id='Email' name='Email' defaultValue={formData.Email} onChange={handlerChange} className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="Password" className=' text-lg block mb-2'>Password</label>
                        <input type="Password" id='Password' name='password' defaultValue={formData.Password} onChange={handlerChange} className=' w-full p-2 rounded-lg focus:outline-none border-2' />
                    </div>
                    <div className=' text-center mt-5'>
                        <button type='submit' disabled={loading} className=' bg-sky-500 text-white py-2 px-4 border-2 border-sky-500 rounded-lg hover:bg-white hover:text-sky-500 transition'>{loading ? 'Updating' : 'Update'}</button>
                    </div>
                </form>
                <button disabled={deleting} className=' bg-sky-500 text-white py-2 px-4 border-2 border-sky-500 rounded-lg hover:bg-white hover:text-sky-500 transition' onClick={deleteHandler}>{deleting ? 'Deleting' : 'Delete'}</button>
                <p className=' text-center text-rose-600 text-base'>{error ? error : ''}</p>
                <p className=' text-center text-green-600 text-base'>{success ? success : ''}</p>
            </div>
        </div>
    )
}
