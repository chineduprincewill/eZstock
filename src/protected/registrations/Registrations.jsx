import React, { useContext, useEffect, useState } from 'react'
import VendorTabs from './components/VendorTabs';
import AllVendors from './components/AllVendors';
import FullyRegistered from './components/FullyRegistered';
import OnlySignedup from './components/OnlySignedup';
import PartlyRegistered from './components/PartlyRegistered';
import { fetchAllVendors } from '../../apis/registrationsActions';
import LoadingBars from '../../common/LoadingBars';
import { AppContext } from '../../context/AppContext';
import { AiOutlineSearch } from 'react-icons/ai';

const Registrations = () => {

    const { token, user, logout } = useContext(AppContext);

    const [activeComponent, setActiveComponent] = useState('all vendors');
    const [vendors, setVendors] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const columns = [
        {
            name: "Company",
            selector: (row) => row?.company_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='font-extralight py-1 capitalize'>{row?.company_name.toLowerCase()}</div>
            )
        },
        {
            name: "Registration form",
            selector: (row) => row?.reg_count,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full'>
                    {row?.reg_count >= 60 && <span className='text-[#54c5d0]'>completed</span>}
                    {(row?.reg_count > 0 && row?.reg_count < 60) && <span className='text-orange-500'>incomplete</span>}
                    {(row?.reg_count === 0 || !row?.reg_count || row?.reg_count === null)  && <span className='text-red-500'>Not started</span>}
                </div>
            )
        },
        {
            name: "Document upload",
            selector: (row) => row?.doc_count,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full'>
                    {row?.doc_count >= 4 && 
                        <span className='text-[#54c5d0] '>
                            {Math.floor(Math.floor(parseInt(row?.doc_count))/9 * 100) > 100 ? '100' : Math.floor(Math.floor(parseInt(row?.doc_count))/9 * 100) }%
                        </span>}
                    {(row?.doc_count > 0 && row?.doc_count < 4) && <span className='text-orange-500 '>{Math.floor(Math.floor(parseInt(row?.doc_count))/9 * 100) }%</span>}
                    {row?.doc_count === 0 || row?.doc_count === null && <span className='text-red-500'>None</span>}
                </div>
            )
        },
        {
            name: "Status",
            selector: (row) => row?.vendor_application_status,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full flex items-center justify-between'>
                    {
                        (row?.reg_count >= 60 && row?.doc_count >= 4 ?
                            (row?.vendor_score === "" || !row?.vendor_score || row?.vendor_score === null ? 
                                <span className='text-[#54c5d0] capitalize'>registered</span> : 
                                (row?.completed_by === "" || !row?.completed_by || row?.completed_by === null ? 
                                    <span className='text-[#54c5d0] capitalize'>registered</span> :
                                    (row?.reviewed_by === "" || !row?.reviewed_by || row?.reviewed_by === null) ?   <span className='text-[#54c5d0] capitalize'>registered</span> :
                                    (row?.vendor_application_status === 'REGISTERED' ? <span className='text-[#54c5d0] capitalize'>{row?.vendor_application_status.toLowerCase()}</span>
                                    : (row?.vendor_application_status === "REJECTED" && 
                                        <span className='text-red-500 capitalize'>{row?.vendor_application_status.toLowerCase()}</span>
                                        )
                                    )
                                ) 
                            ) : <span className='text-orange-500 capitalize'>???</span>
                        )
                    }
                    <AiOutlineSearch size={20} className='cursor-pointer' />
                </div>
            )
        },
    ];

    const componentsArray = [
        {
            title: 'all vendors',
            component: <AllVendors data={vendors?.vendors} columns={columns} label='all vendors' />
        },
        {
            title: 'fully registered',
            component: <FullyRegistered data={vendors?.vendors} columns={columns} label='fully registered' />
        },
        {
            title: 'partly registered',
            component: <PartlyRegistered data={vendors?.vendors} columns={columns} label='partly registered' />
        },
        {
            title: 'only signed-up',
            component: <OnlySignedup data={vendors?.vendors} columns={columns} label='only signed-up' />
        },
    ]

    if(vendors?.status && vendors?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        fetchAllVendors(token, setVendors, setError, setFetching);
    }, [activeComponent])

    return (
        <div className='w-full m-0'>
            <div className='w-full my-4 p-4 flex items-center justify-end gap-4 md:gap-8 border-b border-gray-300 dark:border-gray-700 shadow-xl'>
            {
                componentsArray.map((item, index) => (
                    <VendorTabs label={item?.title} setActiveComponent={setActiveComponent} activeComponent={activeComponent} key={index} />
                ))
            }
            </div>
            <div className='w-full my-4 p-4'>
            {
                fetching || vendors === null || vendors?.vendors.length === 0 ?
                <LoadingBars />
                :
                componentsArray.map((item, index) => {
                    if(item?.title === activeComponent){
                        return <div className='w-full' key={index}>{item?.component}</div>
                    }
                })
            }
            </div>
        </div>
    )
}

export default Registrations