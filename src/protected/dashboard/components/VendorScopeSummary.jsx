import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { fetchVendorsScopeSummary } from '../../../apis/dashboardActions';
import RecordsTable from '../../../common/RecordsTable';
import LoadingBars from '../../../common/LoadingBars';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const VendorScopeSummary = () => {

    const { token, logout } = useContext(AppContext);
    const [scopeArray, setScopeArray] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [divOpen, setDivOpen] = useState(false);

    const columns = [
        {
            name: "Scope",
            selector: (row) => row?.scope,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='font-extralight py-1'>{row?.scope}</div>
            )
        },
        {
            name: "Total",
            selector: (row) => row?.count,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full flex justify-end'><span>{row?.count}</span></div>
            )
        },
    ];

    if(scopeArray?.status && scopeArray?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        fetchVendorsScopeSummary(token, setScopeArray, setError, setFetching);
    }, [])

    return (
        <div className='w-full p-4'>
            <div 
                className='w-full flex justify-between items-center uppercase text-sm text-[#54c5d0] font-bold mb-[-5px] shadow-xl px-2 pb-4 border-b border-gray-300 dark:border-gray-700 cursor-pointer'
                onClick={() => setDivOpen(!divOpen)}
            >
                
                <span>summary of reviewed vendors by scope</span>
                {
                    divOpen ? 
                    <AiOutlineMinus 
                        size={20} 
                    />
                    :
                    <AiOutlinePlus 
                        size={20} 
                    />
                }
            </div>
            <div className={`mt-2 w-full ${divOpen ? 'block' : 'hidden'}`}>
                {
                    fetching ? 
                        ""
                        :
                        scopeArray !== null && scopeArray?.scopeArray.length > 0 ?
                            <RecordsTable columns={columns} data={scopeArray?.scopeArray} /> : <span className='text-red-500'>No records found!</span>
                }
            </div>
        </div>        
    )
}

export default VendorScopeSummary