import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { formatErrorMessage } from '../../../../apis/functions'
import { AppContext } from '../../../../context/AppContext'
import { resetUserPassword } from '../../../../apis/authActions'

const PasswordReset = ({ setResetPassword }) => {

    const { token } = useContext(AppContext);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [resetting, setResetting] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/i;
    const [newpasserror, setNewpasserror] = useState();
    const [confirmpasserror, setConfirmpasserror] = useState();

    useEffect(() => {
        newPassword && !passwordRegex.test(newPassword) ? 
            setNewpasserror('New password must be a combination of minimum of 8 letters, numbers, and symbols.'):
            setNewpasserror();
    }, [newPassword])

    useEffect(() => {
        confirmPassword && confirmPassword !== newPassword ?
            setConfirmpasserror('Password does not match'):
            setConfirmpasserror();
    }, [confirmPassword])

    const handleReset = (e) => {
        e.preventDefault();

        if(currentPassword === newPassword){
            setError('You cannot use the current password as your new password!')
        }
        else{
            const data = {
                currentPassword, newPassword, confirmPassword
            }
            resetUserPassword(token, data, setSuccess, setError, setResetting)
        }
    }

    if(success){
        alert(success);
        setResetPassword(false)
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                reset password
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setResetPassword(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            {
                                error && <div className='text-red-500 mb-2'>{formatErrorMessage(error)}</div>
                            }
                            <form onSubmit={handleReset} className='space-y-4'>
                                <input 
                                    type='password' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Current password'
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <div className='grid gap-0.5'>
                                    <input 
                                        type='password' 
                                        className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                        placeholder='New password'
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                {
                                    newpasserror && <span className='text-xs text-red-600'>{newpasserror}</span>
                                }
                                </div>
                                <div className='grid gap-0.5'>
                                    <input 
                                        type='password' 
                                        className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                        placeholder='Confirm password'
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                {
                                    confirmpasserror && <span className='text-xs text-red-600'>{confirmpasserror}</span>
                                }
                                </div>
                                
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                >
                                    {
                                        resetting ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Reset'
                                        }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset