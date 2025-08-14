import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { HiOutlinePlus, HiTrash } from 'react-icons/hi';
import { deletePacksize, fetchAllPacksizes } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import NewPacksize from './forms/NewPacksize';

const PacksizesComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [packsizes, setPacksizes] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [createPacksizeModal, setCreatePacksizeModal] = useState(false);

    const columns = [
        {
            name: "Pack name",
            selector: (row) => row?.packname,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.packname}</div>
            )
        },
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.name}</div>
            )
        },
        {
            name: "Qty/pack",
            selector: (row) => row?.quantity_per_pack,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.quantity_per_pack}</div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                    <HiTrash 
                        size={15} 
                        className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.pack_id) && 'animate-ping'}`}
                        title='delete pack'
                        onClick={() => packsizeDelete(row?.pack_id)}
                    />
                </div>
            ),
        },
    ];

    if(packsizes?.status === "Token is Expired"){
        logout();
    }

    const packsizeDelete = (id) => {
        if(window.confirm(`Are you sure you want to delete this pack size record?`)){
            setDelete_id(id);
            const data = {
                id
            }
            deletePacksize(token, data, setSuccess, setError, setDeleting)
        }
    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchAllPacksizes(token, setPacksizes, setError, setFetching)
    }, [record])
    
    return (
        <div className='w-full grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>Pack sizes</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreatePacksizeModal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
            packsizes && <RecordsTable columns={columns} data={packsizes} />
        }
        
        {
            createPacksizeModal && <NewPacksize setCreatePacksizeModal={setCreatePacksizeModal} />
        }
        </div>
    )
}

export default PacksizesComponent