import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AppContext } from '../../../context/AppContext';
import SubmittingButton from '../../../common/SubmittingButton';
import LinkageCoordinators from './LinkageCoordinators';
import { updateCasefinder } from '../../../apis/casefindersActions';

const EditModal = ({ setEditmodal, updatedata }) => {

    const { token, refreshRecord } = useContext(AppContext);

    const [linkageCordinator, setLinkageCordinator] = useState();
    const [success, setSuccess] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState();
    const [updating, setUpdating] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();

        if(window.confirm(`Are you sure you want to change ${updatedata?.fullname}'s Linkage Coordinator?`)){
            const data = {
                id: updatedata?.id,
                linkage_coordinator: linkageCordinator
            }
    
            updateCasefinder(token, data, setSuccess, setError, setUpdating);
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
        refreshRecord(Date.now())
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-gray-700 uppercase font-bold text-sm'>
                            {updatedata?.fullname} Record Update 
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setEditmodal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full'>
                        {successMsg && <span className='text-green-600'>{successMsg}</span>}
                        {errorMsg && <span className='text-red-600'>{errorMsg}</span>}
                        </div>
                        <div className='w-full py-2'>
                            <div className='w-full'>
                                <span>Linkage Coordinator - {updatedata?.linkage_coordinator}</span>
                            </div>
                            {
                                updatedata?.usercategory !== 'Linkage Coordinator' &&
                                <form onSubmit={handleUpdate} className='w-full space-y-1'>
                                    <div className='space-y-1 py-4'>
                                        <span className='text-sm'>Want to change?</span>
                                        <LinkageCoordinators lga={updatedata?.lga} setLinkageCordinator={setLinkageCordinator} />
                                    </div>
                                    
                                {
                                    updating ?
                                        <SubmittingButton buttonText='Updating...' />
                                        :
                                        <button
                                            className='w-full p-2 bg-[#005072] text-white'
                                        >
                                            <span>Update</span>
                                        </button>
                                }
                                </form>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal