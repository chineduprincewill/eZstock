import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { HiTrash } from 'react-icons/hi';
import { deletePacksize, fetchAllPacksizes } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';

const PacksizesComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [packsizes, setPacksizes] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState(false);
    const [delete_id, setDelete_id] = useState();

    const columns = [
        {
            name: "Pack name",
            selector: (row) => row?.packname,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.packname}</div>
            )
        },
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.name}</div>
            )
        },
        {
            name: "Qty/pack",
            selector: (row) => row?.quantity_per_pack,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.quantity_per_pack}</div>
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
        <div className='w-full'>
        {
            fetching ? <LoadingBars />:
            packsizes && <RecordsTable columns={columns} data={packsizes} />
        }
        </div>
    )
}

export default PacksizesComponent