import React from 'react'
import { FaRegRegistered } from 'react-icons/fa'

const SignUp = ({ setActiveAuth }) => {
    return (
        <div className='col-span-1 p-4 md:p-24'>
            <div className='flex gap-2 items-center md:mt-6'>
                <FaRegRegistered size={35} />
                <span className='text-3xl'>Create account</span>
            </div>
            <form className='grid space-y-6 my-6'>
                <div className='w-full flex gap-4 items-center'>
                    <label class="inline-flex items-center space-x-2">
                        <input type="radio" name="category" value="REVIEWER" className="form-radio h-5 w-5 text-[#85a62a] border-gray-300 focus:ring-[#85a62a]" />
                        <span>Reviewer</span>
                    </label>
                    <label class="inline-flex items-center space-x-2">
                        <input type="radio" name="category" value="APPROVER" className="form-radio h-5 w-5 text-[#85a62a] border-gray-300 focus:ring-[#85a62a]" />
                        <span>Approver</span>
                    </label>
                </div>
                <input 
                    type='text'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='full name'
                />
                <input 
                    type='email'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='email'
                />
                <input 
                    type='password'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='confirm password'
                />
                <input 
                    type='password'
                    className='w-full p-2 rounded-md border bg-transparent'
                    placeholder='password'
                />
                <button
                    className='w-full p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black'
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default SignUp