import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import SubmittingButton from '../../../common/SubmittingButton';
import { passwordReset } from '../../../apis/casefindersActions';
import { AppContext } from '../../../context/AppContext';

const PwdResetModal = ({ setReset, resetdata }) => {

    const { token } = useContext(AppContext);
    const [newpassword, setNewpassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [resetting, setResetting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState();

    const handleReset = (e) => {
        e.preventDefault();

        if(newpassword !== confirmpassword){
            setErrorMsg('Password mismatch')
        }
        else{
            if(window.confirm('Are you sure you want to reset this account password?')){
                const data = {
                    id: resetdata?.id,
                    newpassword,
                }
                
                passwordReset(token, data, setSuccess, setError, setResetting)
            }
        }
    }

    if(error !== null){
        setErrorMsg(JSON.stringify(error?.message));
        setError(null);
    }

    if(success !== null){
        setSuccessMsg(success?.success);
        setErrorMsg();
        setSuccess(null);
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[400px] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-gray-700 uppercase font-bold text-sm'>
                            {resetdata?.fullname} Password Reset 
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setReset(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full'>
                        {successMsg && <span className='text-green-600'>{successMsg}</span>}
                        {errorMsg && <span className='text-red-600'>{errorMsg}</span>}
                        </div>
                        <div className='py-4'>
                            <form onSubmit={handleReset} className='w-full space-y-4'>
                                <input 
                                    type='password' 
                                    className='w-full p-2 border border-gray-400'
                                    required
                                    placeholder='New password'
                                    onChange={(e) => setNewpassword(e.target.value)}
                                />
                                <input 
                                    type='password' 
                                    className='w-full p-2 border border-gray-400'
                                    required
                                    placeholder='Confirm password'
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                />
                            {
                                resetting ?
                                    <SubmittingButton buttonText='Resetting...' />
                                    :
                                    <button
                                        className='w-full p-2 bg-[#005072] text-white'
                                    >
                                        <span>Reset</span>
                                    </button>
                            }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PwdResetModal