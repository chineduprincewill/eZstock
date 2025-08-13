import React, { useState } from 'react'
import ThemeToggle from '../../common/ThemeToggle'
import { PiKeyholeLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { loginUser } from '../../apis/authActions'
import HomeStrip from './components/HomeStrip'
import Logo from './components/Logo'

const Login = () => {

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
        <div className='w-full h-screen overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white'>
            <div className='fixed top-0 right-0 p-4'>
                <ThemeToggle />
            </div>
            <div className='w-full '>
                <div className='flex justify-center items-center bg-[url("/assets/bg.png")] max-h-max bg-contain'>
                    <div className="w-full h-screen justify-center bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80">   
                        <div className='md:h-screen flex items-center py-4 px-4 md:px-16'> 
                            <div className='w-full py-0 grid md:flex md:justify-around md:items-center'>                          
                                <div className='w-full flex flex-col gap-4 md:w-[48%] mt-12 md:mt-0'>        
                                    <Logo />
                                    <div className='md:my-2 md:min-h-48'>
                                        <span 
                                            className='md:hidden text-3xl md:text-7xl font-extralight capitalize dark:text-white text-primary md:text-transparent leading-normal'
                                        >
                                            Highly Efficient and Scalable Inventory System
                                        </span>
                                        <HomeStrip />
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='md:text-xl text-selectedprimary'>&copy;</span>
                                        <span className='md:text-xl text-selectedprimary'>Sparksyms Projects</span>
                                    </div>
                                </div>
                                <div className='w-full md:w-[40%] mt-10 md:mt-0'>
                                    <div className='w-full hidden md:flex justify-center items-center mb-8'>
                                        <div className='px-3 py-1 rounded-full bg-primary text-white flex text-4xl'>
                                            <span className='scale-x-[-1] -skew-x-12'>3</span>
                                        </div>
                                    </div>
                                    <span className='text-red-600'>{error !== null && error?.error}</span>
                                    <form onSubmit={handleLogin} className='grid space-y-8 md:my-4'>
                                        <input 
                                            type='email'
                                            className='w-full p-2 rounded-md border bg-transparent'
                                            placeholder='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <input 
                                            type='password'
                                            className='w-full p-2 rounded-md border bg-transparent'
                                            placeholder='password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            className={`w-full flex justify-center p-2 rounded-md bg-primary hover:bg-selectedprimary dark:bg-selectedprimary dark:hover:bg-primary text-white`}
                                        >
                                            {
                                                loggingIn ? 
                                                    <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Login'
                                                }
                                        </button>
                                        <div className='flex justify-end'>
                                            <Link className='text-sm text-[#004e71] dark:text-white' to="/">Forgot your password ?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login