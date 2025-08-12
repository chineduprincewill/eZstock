import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import RemarksComponent from './RemarksComponent';
import ErrorModal from '../../../common/ErrorModal';
import { requestStatusUpdate } from '../../../apis/requestsActions';

const IncomingRequestUpdate = ({ setShowUpdateform, requestToUpdate }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [remark, setRemark] = useState();
    const [status, setStatus] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [showRemarks, setShowRemarks] = useState(false);
    const [showerror, setShowerror] = useState(false);
    const [errormsg, setErrormsg] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: requestToUpdate?.request_id,
            remark,
            status
        }

        requestStatusUpdate(token, data, setSuccess, setError, setSubmitting);
    }

    if(success){
        refreshRecord(Date.now());
        setShowUpdateform(false);
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-lg'>
                                update request
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setShowUpdateform(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        {
                            error && <span className='text-red-500 py-2'>{JSON.stringify(error?.error)}</span>
                        }
                        <form onSubmit={handleSubmit} className='w-full my-4'>
                            <div className='w-full grid space-y-1'>
                                <span className='text-lg font-extralight'>{requestToUpdate?.itemname}</span>
                                <span className='font-extralight'>{requestToUpdate?.quantity} {requestToUpdate?.packtype}</span>
                                <span className='font-extralight'>{requestToUpdate?.unit_quantity} pcs</span>
                            {
                                requestToUpdate?.remark && 
                                    <div className='w-full flex justify-between items-center'>
                                        <div 
                                            className='flex items-center gap-1 text-blue-500 cursor-pointer'
                                            onClick={() => setShowRemarks(!showRemarks)}
                                        >
                                            <FaCommentDots 
                                                size={16} 
                                            />
                                            <span>Remarks</span>
                                        </div>
                                    {
                                        showRemarks && 
                                            <AiOutlineCloseCircle 
                                                size={15} 
                                                className='text-red-600 cursor-pointer'
                                                onClick={() => setShowRemarks(false)}
                                            />
                                    }
                                    </div>
                            }
                            {
                                showRemarks && <RemarksComponent remark={requestToUpdate?.remark} />
                            }
                            </div>
                            <textarea
                                className='w-full rounded-md p-2 border border-gray-500 bg-transparent my-4'
                                rows='3'
                                onChange={(e) => setRemark(e.target.value)}
                                placeholder='Enter remark'
                            >
                            </textarea>
                            <div className='w-full flex items-center gap-4'>
                                <select 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">status</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="Approved">Approved</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="Rejected">Rejected</option>
                                </select>
                                <button
                                    className={`w-full md:max-w-max flex justify-center items-center py-2 px-6 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black gap-1`}
                                >
                                    {submitting ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                showerror && <ErrorModal message={errormsg} />
            }
        </div>
    )
}

export default IncomingRequestUpdate