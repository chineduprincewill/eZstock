import React, { useState } from 'react'
import { PiKeyholeLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../apis/authActions';
import LoadingIcon from '../../../common/LoadingIcon';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SignIn = ({ setActiveAuth }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loggingIn, setLoggingIn] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email, password
        };
        loginUser(data, setSuccess, setError, setLoggingIn);
    }

    if(success !== null){
        localStorage.setItem('token', JSON.stringify(success?.token));
        localStorage.setItem('user', JSON.stringify(success?.user))
        navigate('/dashboard')
        location.reload();
    }

    return (
        <div className='col-span-1 p-4 md:p-24'>
            <div className='flex gap-1 items-center md:mt-24'>
                <PiKeyholeLight size={40} />
                <span className='text-3xl'>Login</span>
            </div>
            {error !== null && 
                <div className='text-red-600'>{error?.error}</div>
            }
            <form onSubmit={handleLogin} className='grid space-y-6 my-6'>
                <input 
                    type='email'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                >
                    {
                        loggingIn ? 
                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Login'
                     }
                </button>
                <div className='flex justify-end'>
                    <Link className='text-sm' to="/">Forgot your password ?</Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn