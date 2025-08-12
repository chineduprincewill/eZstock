import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { fetchVendorsScopeSummary } from '../../../apis/dashboardActions';

const CategorizationFilter = ({ setScope, setCategory, scope, category, filterBySelection }) => {

    const { token, logout } = useContext(AppContext);
    const [error, setError] = useState(null);
    const [scopeArray, setScopeArray] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(scopeArray?.status && scopeArray?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        fetchVendorsScopeSummary(token, setScopeArray, setError, setFetching);
    }, [])

    return (
        <div className='w-full p-4 mb-4 md:flex md:items-center md:justify-end gap-4 space-y-4 md:space-y-0 border-b border-gray-300 dark:border-gray-700 shadow-xl'>
            <select
                className='w-full md:w-[25%] p-2 rounded-md border bg-transparent'
                onChange={(e) => setCategory(e.target.value)}
            >
                <option className='dark:bg-gray-800' value="">{fetching ? 'fetching category' : 'select category'}</option>
                <option className='dark:bg-gray-800' value="Category A (Major Vendor)">Category A (Major Vendor)</option>
                <option className='dark:bg-gray-800' value="Category B (Mid Vendor)">Category B (Mid Vendor)</option>
                <option className='dark:bg-gray-800' value="Category C (Minor Vendor)">Category C (Minor Vendor)</option>
                <option className='dark:bg-gray-800' value="Not categorized">Not categorized</option>
            </select>
            <select
                className='w-full md:w-[25%] p-2 rounded-md border bg-transparent'
                onChange={(e) => setScope(e.target.value)}
            >
                <option className='dark:bg-gray-800' value="">{fetching ? 'fetching scope...' : 'select scope'}</option>
            {
                scopeArray !== null && scopeArray?.scopeArray?.length > 0 && scopeArray?.scopeArray.map((scp, index) => (
                    <option key={index} value={scp?.scope} className='dark:bg-gray-800'>{scp?.scope}</option>
                ))
            }
            </select>
            <button 
                className={`w-full md:max-w-max ${scope !== "" || category !== "" ? "bg-[#54c5d0]" : "bg-gray-400 dark:bg-gray-700 cursor-default"} px-6 py-2 rounded-md`}
                onClick={() => (scope !== "" || category !== "") && filterBySelection() }
            >
                Filter
            </button>
            <button 
                className='max-w-max px-4 py-2 rounded-full border border-[#54c5d0] shadow-xl'
                onClick={() => window.location.reload()}
            >
                Reset
            </button>
        </div>
    )
}

export default CategorizationFilter