import React, { useContext, useEffect, useState } from 'react'
import LoadingBars from '../../../common/LoadingBars'
import { AppContext } from '../../../context/AppContext';
import { fetchtVendorSummary } from '../../../apis/dashboardActions';

const VendorCategorySummary = () => {

    const { token, logout } = useContext(AppContext);
    
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(summary?.status && summary?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        fetchtVendorSummary(token, setSummary, setError, setFetching);
    }, [])

    return (
        <div className='w-full p-4'>
            {
                fetching ? 
                    <LoadingBars />
                    :
                    <div className='w-full'>
                        <div className='w-full flex justify-between items-center bg-gray-200 dark:bg-gray-700'>
                            <div className='w-[65%] p-2 bg-[#54c5d0]'>
                                <span className='capitalize'>total number of reviewed vendors</span>
                            </div>
                            <div className='w-[33%] p-2'>
                                <span>{summary?.total_registered_vendors?.count}</span>
                            </div> 
                        </div>
                        <div className='mt-12'>
                            <div className='uppercase text-sm text-[#54c5d0] font-bold'>summary of reviewed vendors by category</div>
                            <div className='w-full grid md:flex gap-6 items-center my-2'>
                                <div className='w-full grid p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl'>
                                    <div className='flex gap-1 capitalize font-extralight'>
                                        <span>Category A</span> - <span>Major Vendor</span>
                                    </div>
                                    <div className='flex justify-between items-baseline'>
                                        <span className='font-extralight'>Total No.</span>
                                        <span className='text-4xl'>{summary?.total_registered_vendors_major?.count}</span>
                                    </div>
                                </div>
                                <div className='w-full grid p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl'>
                                    <div className='flex gap-1 capitalize font-extralight'>
                                        <span>Category B</span> - <span>Mid Vendor</span>
                                    </div>
                                    <div className='flex justify-between items-baseline'>
                                        <span className='font-extralight'>Total No.</span>
                                        <span className='text-4xl'>{summary?.total_registered_vendors_mid?.count}</span>
                                    </div>
                                </div>
                                <div className='w-full grid p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl'>
                                    <div className='flex gap-1 capitalize font-extralight'>
                                        <span>Category C</span> - <span>Minor Vendor</span>
                                    </div>
                                    <div className='flex justify-between items-baseline'>
                                        <span className='font-extralight'>Total No.</span>
                                        <span className='text-4xl'>{summary?.total_registered_vendors_minor?.count}</span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
            }
            
            
        </div>
    )
}

export default VendorCategorySummary