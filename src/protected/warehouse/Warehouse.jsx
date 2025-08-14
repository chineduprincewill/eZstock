import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { PiWarehouse } from 'react-icons/pi'
import { AppContext } from '../../context/AppContext'
import { formatDate } from '../../apis/functions'
import { AiOutlineEdit, AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineSend } from 'react-icons/md'
import LoadingBars from '../../common/LoadingBars'
import RecordsTable from '../../common/RecordsTable'
import { fetchAllInventory, filterInventory } from '../../apis/InventoriesActions'
import NewInventory from './components/forms/NewInventory'
import { BsClockHistory } from 'react-icons/bs'
import DispatchHistoryDialog from '../dispatches/components/DispatchHistoryDialog'
import { fetchActiveStates } from '../../apis/settingsActions'
import StateOptions from '../../common/StateOptions'
import LgaOptions from '../../common/LgaOptions'
import { CiFilter } from 'react-icons/ci'
import { BiReset } from 'react-icons/bi'
import FacilityOptions from '../../common/FacilityOptions'

const Warehouse = () => {

    const { token, user, record, logout } = useContext(AppContext);
    const [addInventory, setAddInventory] = useState(false);
    const [inventories, setInventories] = useState();
    const [filteredInventories, setFilteredInventories] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [tool_id, setTool_id] = useState();
    const [batch_no, setBatch_no] = useState();
    const [created_at, setCreated_at] = useState();
    const [historyDialog, setHistoryDialog] = useState(false);
    const [itemname, setItemname] = useState();
    const [groupname, setGroupname] = useState();
    const [states, setStates] = useState();
    const [getting, setGetting] = useState(false);
    const [state_id, setState_id] = useState();
    const [lga_id, setLga_id] = useState();
    const [facility_id, setFacility_id] = useState();
    const [filtering, setFiltering] = useState(false);

    const columns = [
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400 gap-0.5'>
                    <span className='capitalize font-extralight'>{row?.name}</span>
                    <span className='text-[10px] font-extralight text-gray-500'>{row?.batch_no}</span>
                </div>
            )
        },
        {
            name: "Qty",
            selector: (row) => row?.quantity,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400 py-2 gap-1'>
                    <span className='text-sm font-extralight'>{row?.quantity} {row?.packtype}</span>
                    <span className='text-sm font-extralight'>{row?.unit_quantity} pcs</span>
                </div>
            )
        },
        {
            name: "Recepient",
            selector: (row) => row?.receivedby,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400 py-2 space-y-1'>
                    <span className='text-sm font-extralight'>{row?.receivedby && row?.receivedby}</span>
                    <span className='text-xs font-extralight'>{row?.datereceived && formatDate(row?.datereceived)}</span>
                </div>
            )
        },
        {
            name: "Remaining",
            selector: (row) => row?.dispatched,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400'>
                    <span className='text-sm font-extralight'>{row?.unit_quantity - row.dispatched} pcs</span>
                </div>
            )
        },
        {
            name: "Last updated",
            selector: (row) => row?.email,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400 py-2 space-y-1'>
                    <span className='text-sm font-extralight'>{formatDate(row?.created_at)}</span>
                    <span className='text-xs'>{row?.email}</span>
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                {
                    row.dispatched > 0 &&
                        <div 
                            className='max-w-max rounded-full hover:bg-gray-200 dark:bg-gray-700 p-1 cursor-pointer'
                            onClick={() => fetchHistory(row?.tool_id, row?.batch_no, row?.created_at, row?.name)}
                        >
                            <BsClockHistory 
                                size={12}
                                title='dispatch history'
                            />
                        </div>
                }
                {
                    user && JSON.parse(user)?.groupname === 'APIN' ?
                        <AiOutlineEdit 
                            size={15} 
                            className='cursor-pointer hover:bg-gray-200 hover:rounded-md hover:p-0.5' 
                            title='Edit inventory'
                        /> :
                        <AiOutlineSearch 
                            size={15} 
                            className='cursor-pointerhover:bg-gray-200 hover:rounded-md hover:p-0.5' 
                            title='View inventory'
                        />
                }
                {
                    user && JSON.parse(user)?.role === 'store keeper' &&
                        <MdOutlineSend 
                            size={15} 
                            className={`cursor-pointer hover:bg-gray-200 hover:rounded-md hover:p-0.5`} 
                            title='dispatch inventory'
                        />
                }
                </div>
            ),
        },
    ];

    if(inventories?.status === "Token is Expired"){
        logout();
    }

    const fetchHistory = (tool_id, batch_no, created_at, itemname) => {

        setTool_id(tool_id);
        setBatch_no(batch_no);
        setCreated_at(created_at);
        setItemname(itemname)
        setHistoryDialog(true);
    }

    const handleFilter = (e) => {
        e.preventDefault();

        if(!state_id){
            alert('State must be selected!')
        }
        else{
            const data = {
                location_type: groupname,
                location_id: groupname === 'state' ? state_id : 
                    (groupname === 'lga' ? lga_id : facility_id)
            }
            filterInventory(token, data, setFilteredInventories, setError, setFetching)
        }
    }

    useEffect(() => {
        fetchActiveStates(token, setStates, setError, setGetting)
    }, [])

    useEffect(() => {
        fetchAllInventory(token, setInventories, setError, setFetching)
    }, [record])

    let icon = <PiWarehouse size={20} />
    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full flex justify-between items-center mb-8'>   
                {icon}
                {
                    user && JSON.parse(user)?.groupname === 'APIN' &&
                    <button 
                        className='px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white text-sm font-extralight capitalize border border-primary dark:border-white shadow-xl'
                        onClick={() => setAddInventory(true)}
                    >
                        add inventory
                    </button>
                }
            </div>
            {
                user && JSON.parse(user)?.groupname === 'APIN' &&
                <form onSubmit={handleFilter} className='w-full grid md:flex items-center gap-4 mt-4 pb-4 border-b border-gray-300 dark:border-gray-700'>
                    <select
                        className='w-full md:max-w-max rounded-md p-2 border border-gray-500 bg-transparent'
                        onChange={(e) => setGroupname(e.target.value)}
                        required
                    >
                        <option className='dark:bg-gray-800 dark:text-white' value=''>select group</option>
                        <option className='dark:bg-gray-800 dark:text-white' value='state'>state</option>
                        <option className='dark:bg-gray-800 dark:text-white' value='lga'>lga</option>
                        <option className='dark:bg-gray-800 dark:text-white' value='facility'>facility</option>
                    </select>
                    <div className='w-full md:w-[200px]'>
                        <StateOptions setState_id={setState_id} />
                    </div>
                    <div className='w-full md:w-[200px]'>
                        <LgaOptions setLga_id={setLga_id} state_id={state_id} />
                    </div>
                    <div className='w-full md:w-[200px]'>
                        <FacilityOptions setFacility_id={setFacility_id} lga_id={lga_id} facility_id={facility_id} />
                    </div>
                    <button
                        className={`w-full md:max-w-max flex justify-center p-2 rounded-md bg-primary hover:bg-selectedprimary text-white`}
                    >
                        {
                            fetching ? 
                                <AiOutlineLoading3Quarters size={22} className='animate-spin' /> : 
                                <CiFilter size={22} />
                            }
                    </button>

                    <div className='rounded-full max-w-max p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
                        <BiReset 
                            size={22} 
                            onClick={() => window.location.reload()}
                            title='Reset filter'
                        />
                    </div>
                </form>
            }
            <div className='w-full mt-8 mb-4'>
            {
                fetching ? <LoadingBars /> :
                    filteredInventories && filteredInventories.length > 0 ?
                        <RecordsTable columns={columns} data={filteredInventories} /> :
                            inventories && inventories.length > 0 ?
                                <RecordsTable columns={columns} data={inventories} /> :
                                <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No inventory record found!</div>
            }
            {
                addInventory && <NewInventory setAddInventory={setAddInventory} />
            }
            {
                historyDialog && <DispatchHistoryDialog tool_id={tool_id} batch_no={batch_no} created_at={created_at} itemname={itemname} setHistoryDialog={setHistoryDialog} />
            }
            </div>
        </div>
    )
}

export default Warehouse