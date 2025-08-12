import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AppContext } from '../../../context/AppContext'
import { getVendorDataForCategorization } from '../../../apis/vendorsActions';
import { MdOutlineHomeRepairService, MdOutlineRateReview } from 'react-icons/md';
import LoadingBars from '../../../common/LoadingBars';
import VendorData from './VendorData';
import VendorScoreSummary from './VendorScoreSummary';
import VendorAICategorization from './VendorAICategorization';
import VendorManualCategorization from './VendorManualCategorization';

const VendorCategorizationForm = ({ setShowVendorCategorizationForm, vendor }) => {

    const { token, refreshRecord, logout } = useContext(AppContext);
    const [vendordata, setVendordata] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false)

    if(vendordata?.status && vendordata?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        getVendorDataForCategorization(token, {email :vendor[1]}, setVendordata, setError, setFetching)
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full overflow-auto md:w-[95%] h-[90vh] rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 px-3 md:px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2 text-red-500'>
                            <span className='text-[#54c5d0] uppercase font-bold'>
                                vendor categorization form
                            </span>
                            <span
                                className='cursor-pointer'
                            >    
                                <AiOutlineCloseCircle 
                                    size={20} 
                                    onClick={() => setShowVendorCategorizationForm(false)}
                                />
                            </span>
                        </div>
                        <div className='w-full py-8'>
                        {
                            vendordata === null || fetching ? 
                                <>
                                    <LoadingBars />
                                    <LoadingBars />
                                </>
                                :
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='grid md:flex md:justify-between space-y-4 md:space-y-0'>
                                        <VendorData vendordata={vendordata} />
                                        <VendorScoreSummary vendordata={vendordata} />
                                    </div>
                                    <div className='grid md:flex md:justify-between md:items-baseline space-y-4 md:space-y-0'>
                                        <VendorAICategorization vendordata={vendordata} />
                                        <VendorManualCategorization vendordata={vendordata} setShowVendorCategorizationForm={setShowVendorCategorizationForm} />
                                    </div>
                                </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorCategorizationForm