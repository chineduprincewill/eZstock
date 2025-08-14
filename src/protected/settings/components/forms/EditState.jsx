import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AppContext } from '../../../../context/AppContext';
import { updateState } from '../../../../apis/settingsActions';

const EditState = ({ setEditmodal, state}) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [state_name, setState_name] = useState(state?.state_name);
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            id: state?.state_id,
            state_name
        }

        updateState(token, data, setSuccess, setError, setUpdating)
    }

    if(success){
        refreshRecord(Date.now())
        setEditmodal(false)
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-sm'>
                                edit state
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setEditmodal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            <form onSubmit={handleUpdate} className='space-y-4'>
                            {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='State name'
                                    value={state_name}
                                    onChange={(e) => setState_name(e.target.value)}
                                    required
                                />
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-primary hover:bg-hoverprimary text-white`}
                                >
                                    {
                                        updating ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Update'
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

export default EditState