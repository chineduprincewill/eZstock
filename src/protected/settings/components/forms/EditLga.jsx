import React, { useContext, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import StateOptions from '../../../../common/StateOptions';
import { createNewLga, updateLga } from '../../../../apis/settingsActions';

const EditLga = ({ setEditLgaModal, lga }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [lga_name, setLga_name] = useState(lga?.lga_name);
    const [state_id, setState_id] = useState(lga?.state_id);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    console.log(lga);

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = { id: lga?.lga_id, lga_name, state_id }
        updateLga(token, data, setSuccess, setError, setSaving)
    }

    if(success){
        refreshRecord(Date.now())
        setEditLgaModal(false)
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-sm'>
                                edit L G A
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setEditLgaModal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            <form onSubmit={handleUpdate} className='space-y-4'>
                            {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                                <StateOptions setState_id={setState_id} state_id={lga?.state_id} />
                                <input 
                                    type='text' 
                                    value={lga_name}
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='LGA name'
                                    onChange={(e) => setLga_name(e.target.value)}
                                    required
                                />
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-primary hover:bg-hoverprimary text-white`}
                                >
                                    {
                                        saving ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Save'
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

export default EditLga