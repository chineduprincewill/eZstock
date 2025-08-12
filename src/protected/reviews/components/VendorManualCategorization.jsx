import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { CiEdit } from 'react-icons/ci';
import { AiOutlineLoading3Quarters, AiOutlineSave } from 'react-icons/ai';
import { storeVendorDataForCategorization } from '../../../apis/vendorsActions';

const VendorManualCategorization = ({ vendordata, setShowVendorCategorizationForm }) => {

    const { token, user, refreshRecord } = useContext(AppContext);

    const [categorization, setCategorization] = useState();
    const [threshold, setThreshold] = useState();
    const [remarks, setRemarks] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const computeStatus = () => {
        let application_status = vendordata?.vendor_scoring_total[0]?.marks_scored_by_vendor <= 49 && categorization === "Rejected, Not categorized" ? 'REJECTED' : 'REGISTERED';

        return application_status;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitting(true);

        const data = {
            categorization,
            threshold,
            remarks,
            company_name: vendordata?.vendor_data[0]?.company_name,
            email: vendordata?.vendor_data[0]?.email,
            score: vendordata?.vendor_scoring_total[0]?.marks_scored_by_vendor,
            vendor_application_status: computeStatus()
        }

        storeVendorDataForCategorization(token, data, setSuccess, setError, setSubmitting);
    }

    if(success){
        refreshRecord(Date.now());
        setTimeout(() => setShowVendorCategorizationForm(false), 2000);
    }

    return (
        <div className='w-full md:w-[49%] p-4 my-6 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-gray-700'>
                <CiEdit size={20} />
                <span className='capitalize'>vendor manual categorization</span>
            </div>
            {error && <span className='text-red-600'>{JSON.stringify(error)}</span>}
            <form onSubmit={handleSubmit} className='w-full my-4 grid space-y-6 md:space-y-4'>
                <div className='grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                    <select
                        className='w-full md:w-[48%] p-2 rounded-md border dark:border-gray-600 bg-transparent'
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
                        className='w-full md:w-[48%] p-2 rounded-md border dark:border-gray-600 bg-transparent'
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
                <div className='grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                    <textarea
                        className='w-full md:w-[80%] p-2 rounded-md border dark:border-gray-600 bg-transparent'
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder='Enter remark'
                        cols="3"
                        required
                    ></textarea>
                    <div className='w-full md:w-[20%] grid'>
                        <button className='max-w-max mx-auto p-2 rounded-full bg-[#a8d13a] hover:bg-[#85a62a] text-black'>
                        {
                            submitting ? 
                                <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : <AiOutlineSave size={24} />
                        }
                        </button>
                        <span className='mx-auto text-sm'>
                        {submitting ? 'Saving...' : (
                            success ? <span className='text-green-500'>Saved</span> : 'Save')}
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default VendorManualCategorization