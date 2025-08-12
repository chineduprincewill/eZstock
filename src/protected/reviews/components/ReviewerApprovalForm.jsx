import React, { useContext, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters, AiOutlineSave } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { AppContext } from '../../../context/AppContext'
import { storeVendorDataForApproval } from '../../../apis/vendorsActions'

const ReviewerApprovalForm = ({ vendordata, setShowVendorCategorizationForm }) => {
    const { token, user, refreshRecord } = useContext(AppContext);

    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState();
    const [categorization, setCategorization] = useState();
    const [threshold, setThreshold] = useState();
    const [remarks, setRemarks] = useState();

    const computeStatus = () => {
        let application_status = vendordata[0]?.score <= 49 && categorization === "Rejected, Not categorized" ? 'REJECTED' : 'REGISTERED';

        return application_status;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: vendordata[0]?.email,
            categorization,
            threshold,
            remarks,
            vendor_application_status: computeStatus()
        }

        storeVendorDataForApproval(token, data, setSuccess, setError, setSubmitting);
    }

    if(success?.success){
        refreshRecord(Date.now());
        setTimeout(() => setShowVendorCategorizationForm(false), 2000);
    }

    return (
        <div className='w-full p-4 my-6 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-gray-700'>
                <CiEdit size={20} />
                <span className='capitalize'>{user && JSON.parse(user)?.name} categorization approval</span>
            </div>
            {error && <span className='text-red-600'>{JSON.stringify(error)}</span>}
            <form onSubmit={handleSubmit} className='w-full my-4 grid md:flex md:justify-between items-center  space-y-6 md:space-y-0'>
                <div className='grid space-y-3 w-full md:w-[49%]'>
                    <select
                        className='w-full p-2 rounded-md border dark:border-gray-600 bg-transparent'
                        onChange={(e) => setCategorization(e.target.value)}
                        required
                    >
                        <option className='dark:bg-gray-800' value="">Select category</option>
                        <option className='dark:bg-gray-800' value="Category A (Major Vendor)">Category A (Major Vendor)</option>
                        <option className='dark:bg-gray-800' value="Category B (Mid Vendor)">Category B (Mid Vendor)</option>
                        <option className='dark:bg-gray-800' value="Category C (Minor Vendor)">Category C (Minor Vendor)</option>
                        <option className='dark:bg-gray-800' value="Rejected, Not categorized">Rejected, Not categorized</option>
                    </select>
                    <select
                        className='w-full p-2 rounded-md border dark:border-gray-600 bg-transparent'
                        onChange={(e) => setThreshold(e.target.value)}
                        required
                    >
                        <option className='dark:bg-gray-800' value="">Select threshold</option>
                        <option className='dark:bg-gray-800' value="Unlimited">Unlimited</option>
                        <option className='dark:bg-gray-800' value="Limited to 25 Million & Below">Limited to 25 Million & Below</option>
                        <option className='dark:bg-gray-800' value="Limited to 5 million and below (including direct purchases)">Limited to 5 million and below (including direct purchases)</option>
                        <option className='dark:bg-gray-800' value="N/A">N/A</option>
                    </select>
                </div>
                <div className='w-full md:w-[49%] grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                    <textarea
                        className='w-full max-h-max md:w-[80%] p-2 rounded-md border dark:border-gray-600 bg-transparent'
                        rows="3"
                        placeholder='Enter remark'
                        onChange={(e) => setRemarks(e.target.value)}
                        required
                    ></textarea>
                    <div className='w-full md:w-[20%] grid space-y-1'>
                        <button className='max-w-max mx-auto p-2 rounded-full bg-[#54c5d0] hover:bg-[#379199] text-black'>
                        {
                            submitting ? 
                                <AiOutlineLoading3Quarters size={35} className='animate-spin' /> : <AiOutlineCheckCircle size={35} />
                        }
                        </button>
                        <span className='mx-auto text-sm'>
                        {submitting ? 'Completing...' : (
                            success ? <span className='text-green-500'>Completed</span> : 'Complete')}
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ReviewerApprovalForm